import type { Course, User } from './data.js';
import { randomID } from './data.js';

export const user: User = {
	id: 'john_doe',
	first_name: 'John',
	last_name: 'Doe',
	email: 'john.doe@example.com',
};

export const course: Course = {
	id: '__demo__',
	name: 'Demo 101',
	projects: [],
	resources: [
		{
			id: randomID(),
			title: 'Peripheral Neuropathy',
			kind: 'website',
			contents: 'https://en.wikipedia.org/wiki/Peripheral_neuropathy',
		},
		{
			id: randomID(),
			title: 'Thoughts on Neuropathy',
			kind: 'plain',
			contents: `# My Thoughts

This is a place for personal notes and observations.

Topics to Research:
- Treatment options for neuropathy
- Preventative measures
- Latest research findings

Questions for Next Appointment:
1. What are the long-term prognosis?
2. Are there any lifestyle changes recommended?
3. Should I consider physical therapy?`,
		},
		{
			id: randomID(),
			title: 'Lecture Notes',
			kind: 'document',
			contents: `# Advanced Understanding of Neuropathy
Date: June 15, 2023  
Presenter: Dr. Sarah Johnson

## Key Points
- Neuropathy often begins in the longest nerves (feet and hands)
- Diabetic neuropathy is the most common cause in developed countries
- Early intervention is critical for preventing progression
- New research shows promise in nerve regeneration therapies

## Diagnostic Approaches
- Nerve conduction studies
- Electromyography (EMG)
- Quantitative sensory testing
- Skin biopsy for small fiber evaluation

## Treatment Options
1. Pain management
2. Blood sugar control for diabetic neuropathy
3. Physical therapy
4. Emerging treatments: alpha-lipoic acid, gene therapy`,
		},
	],
} satisfies Course;
