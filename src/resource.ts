import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const icons = {
	video: html`<svg viewBox="0 0 24 24">
		<rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill="var(--icon-bg)" />
		<polygon points="10,8 16,12 10,16" fill="var(--icon-fg)" />
	</svg>`,

	article: html`<svg viewBox="0 0 24 24">
		<rect x="3" y="2" width="18" height="20" rx="2" ry="2" fill="var(--icon-bg)" />
		<rect x="6" y="5" width="12" height="2" rx="1" fill="var(--icon-fg)" />
		<rect x="6" y="9" width="12" height="2" rx="1" fill="var(--icon-fg)" />
		<rect x="6" y="13" width="12" height="2" rx="1" fill="var(--icon-fg)" />
		<rect x="6" y="17" width="8" height="2" rx="1" fill="var(--icon-fg)" />
	</svg>`,
};

export type ResourceIcon = null | keyof typeof icons;

/**
 * A resource in the resource list
 */
@customElement('ile-resource')
export class Resource extends LitElement {
	@property() public accessor icon: ResourceIcon = null;

	@property() public accessor title: string = '';

	/** The summary displayed in the resource list */
	@property() public accessor summary: string = '';

	public contents: string = '';

	render() {
		return html`
			<h3>${this.icon ? icons[this.icon] : nothing}${this.title}</h3>
			<p>${this.summary}</p>
		`;
	}
}
