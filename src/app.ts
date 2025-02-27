import * as menu from './menu.js';
import * as resource from './resource.js';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
	// Initialize the menu with tab icons and switching functionality
	menu.init();

	// Placeholder / demo data.

	resource.addDocument(
		// Credit to Wikipedia
		'Neuropathy',
		`Peripheral neuropathy, often shortened to neuropathy, refers to damage or disease affecting the nerves. 
		Damage to nerves may impair sensation, movement, gland function, and/or organ function depending on which nerve fibers are affected.
		
		Neuropathies affecting motor, sensory, or autonomic nerve fibers result in different symptoms. More than one type of fiber may be affected simultaneously. Peripheral neuropathy may be acute (with sudden onset, rapid progress) or chronic (symptoms begin subtly and progress slowly), and may be reversible or permanent.`
	);

	resource.addDocument(
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

	resource.addDocument(
		'Lecture Notes',
		`# Lecture Notes: Advanced Understanding of Neuropathy
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
});
