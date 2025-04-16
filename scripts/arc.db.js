#!/usr/bin/env node
import { database as db, connect } from '@axium/server/database.js';
import { exit, defaultOutput as out } from '@axium/server/io.js';
import { createHash } from 'node:crypto';
import { sql } from 'kysely';

const hash = createHash('BLAKE2s256');

connect();

const relationExists = table => error => {
	error = typeof error == 'object' && 'message' in error ? error.message : error;
	if (error == `relation "${table}" already exists`) out('warn', 'already exists.');
	else throw error;
};

try {
	out('start', 'Creating Arc schema');
	await db.schema.createSchema('arc').execute();
	out('done');

	out('start', 'Creating table Courses');
	await db.schema
		.withSchema('arc')
		.createTable('Courses')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('user_id', 'uuid', col => col.notNull().references('User.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('created_at', 'timestamptz', col => col.notNull())
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('settings', 'jsonb', col => col.notNull().defaultTo(sql`'{}'::jsonb`))
		.execute()
		.catch(relationExists('Courses'));
	out('done');

	out('start', 'Creating index for Courses.user_id');
	db.schema.withSchema('arc').createIndex('Courses_user_id_index').on('Courses').column('user_id').execute().catch(relationExists('Courses_user_id_index'));
	out('done');

	out('start', 'Creating table Resources');
	await db.schema
		.withSchema('arc')
		.createTable('Resources')
		.addColumn('id', 'uuid', col => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
		.addColumn('user_id', 'uuid', col => col.notNull().references('User.id').onDelete('cascade').onUpdate('cascade'))
		.addColumn('created_at', 'timestamptz', col => col.notNull())
		.addColumn('modified_at', 'timestamptz', col => col.notNull())
		.addColumn('name', 'text', col => col.notNull())
		.addColumn('kind', 'text', col => col.notNull())
		.addColumn('content', 'text', col => col.notNull())
		// resource specific data
		.addColumn('metadata', 'jsonb', col => col.notNull().defaultTo(sql`'{}'::jsonb`))
		.execute()
		.catch(relationExists('Resources'));
	out('done');

	out('start', 'Creating index for Resources.user_id');
	db.schema.withSchema('arc').createIndex('Resources_user_id_index').on('Resources').column('user_id').execute().catch(relationExists('Resources_user_id_index'));
	out('done');
} catch (e) {
	exit(e);
}
