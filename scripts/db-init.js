#!/usr/bin/env node
import { connect, database as db } from '@axium/server/database.js';
import { exit, defaultOutput as out, someWarnings } from '@axium/server/io.js';
import { sql } from 'kysely';

connect();

const relationExists = someWarnings(out, [/relation "\w+" already exists/, 'already exists.']);

try {
	out('start', 'Creating Arc schema');
	await db.schema.createSchema('arc').execute();
	out('done');

	out('start', 'Creating table Course');
	await db.schema
		.withSchema('arc')
		.createTable('Course')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('userId', 'uuid', col => col.notNull().references('User.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('createdAt', 'timestamptz', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('visibility', 'smallint', col => col.notNull().defaultTo(0))
		.addColumn('labels', sql`text[]`, col => col.notNull().defaultTo(sql`'{}'::text[]`))
		.execute()
		.catch(relationExists);
	out('done');

	out('start', 'Creating index for Course.userId');
	db.schema.withSchema('arc').createIndex('Course_userId_index').on('Course').column('userId').execute().catch(relationExists);
	out('done');

	out('start', 'Creating table CourseShare');
	await db.schema
		.withSchema('arc')
		.createTable('CourseShare')
		.addColumn('courseId', 'uuid', col => col.notNull().references('Course.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('userId', 'uuid', col => col.notNull().references('User.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('createdAt', 'timestamptz', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('permission', 'smallint', col => col.notNull())
		.execute()
		.catch(relationExists);
	out('done');

	out('start', 'Creating index for CourseShare.userId');
	db.schema.withSchema('arc').createIndex('CourseShare_userId_index').on('CourseShare').column('userId').execute().catch(relationExists);
	out('done');

	out('start', 'Creating index for CourseShare.courseId');
	db.schema.withSchema('arc').createIndex('CourseShare_courseId_index').on('CourseShare').column('courseId').execute().catch(relationExists);
	out('done');

	out('start', 'Creating table Resource');
	await db.schema
		.withSchema('arc')
		.createTable('Resource')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('userId', 'uuid', col => col.notNull().references('User.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('createdAt', 'timestamptz', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('modifiedAt', 'timestamptz', col => col.notNull().defaultTo(sql`now()`))
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('kind', 'text', col => col.notNull())
		.addColumn('content', 'text', col => col.notNull())
		// resource specific data
		.addColumn('metadata', 'jsonb', col => col.notNull().defaultTo(sql`'{}'::jsonb`))
		.execute()
		.catch(relationExists);
	out('done');

	out('start', 'Creating index for Resource.userId');
	db.schema.withSchema('arc').createIndex('Resource_userId_index').on('Resource').column('userId').execute().catch(relationExists);
	out('done');
} catch (e) {
	exit(e);
}
