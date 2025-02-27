import { addDocument, addWebsite } from './resource.js';

addWebsite('https://en.wikipedia.org/wiki/Peripheral_neuropathy', 'Peripheral Neuropathy');

addDocument(
	'My Custom Doc',
	`# My Custom Notes

This is a place for personal notes and observations.

## Topics to Research
- Treatment options for neuropathy
- Preventative measures
- Latest research findings

## Questions for Next Appointment
1. What are the long-term prognosis?
2. Are there any lifestyle changes recommended?
3. Should I consider physical therapy?`
);

addDocument(
	'Lecture Notes',
	`# Advanced Understanding of Neuropathy
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
4. Emerging treatments: alpha-lipoic acid, gene therapy`
);
