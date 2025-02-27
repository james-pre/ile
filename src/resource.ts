import { css, html, LitElement, nothing, render, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { parse as parseMD } from 'marked';
import * as ai from './ai.js';
// Resource icons
export const icons = {
	// Generic file
	generic: html`<svg viewBox="0 0 24 24" width="24" height="24">
		<path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z" fill="var(--icon-bg)" />
		<path d="M14,8V2.5L19.5,8H14z" fill="var(--icon-fg)" />
	</svg>`,

	// A document. Will be parsed as markdown
	document: html`<svg viewBox="0 0 24 24" width="24" height="24">
		<path d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z" fill="var(--icon-bg)" />
		<path d="M14,8V2.5L19.5,8H14z" fill="var(--icon-fg)" />
		<rect x="6" y="12" width="12" height="1" rx="0.5" fill="var(--icon-fg)" />
		<rect x="6" y="15" width="12" height="1" rx="0.5" fill="var(--icon-fg)" />
		<rect x="6" y="18" width="8" height="1" rx="0.5" fill="var(--icon-fg)" />
	</svg>`,

	audio: html`<svg viewBox="0 0 24 24" width="24" height="24">
		<rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill="var(--icon-bg)" />
		<polygon points="10,8 16,12 10,16" fill="var(--icon-fg)" />
	</svg>`,

	video: html`<svg viewBox="0 0 24 24" width="24" height="24">
		<rect x="2" y="4" width="20" height="16" rx="2" ry="2" fill="var(--icon-bg)" />
		<polygon points="10,8 16,12 10,16" fill="var(--icon-fg)" />
	</svg>`,

	// Globe with lines icon.
	website: html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20">
		<path
			d="M256 480c16.7 0 40.4-14.4 61.9-57.3c9.9-19.8 18.2-43.7 24.1-70.7l-172 0c5.9 27 14.2 50.9 24.1 70.7C215.6 465.6 239.3 480 256 480zM164.3 320l183.4 0c2.8-20.2 4.3-41.7 4.3-64s-1.5-43.8-4.3-64l-183.4 0c-2.8 20.2-4.3 41.7-4.3 64s1.5 43.8 4.3 64zM170 160l172 0c-5.9-27-14.2-50.9-24.1-70.7C296.4 46.4 272.7 32 256 32s-40.4 14.4-61.9 57.3C184.2 109.1 175.9 133 170 160zm210 32c2.6 20.5 4 41.9 4 64s-1.4 43.5-4 64l90.8 0c6-20.3 9.3-41.8 9.3-64s-3.2-43.7-9.3-64L380 192zm78.5-32c-25.9-54.5-73.1-96.9-130.9-116.3c21 28.3 37.6 68.8 47.2 116.3l83.8 0zm-321.1 0c9.6-47.6 26.2-88 47.2-116.3C126.7 63.1 79.4 105.5 53.6 160l83.7 0zm-96 32c-6 20.3-9.3 41.8-9.3 64s3.2 43.7 9.3 64l90.8 0c-2.6-20.5-4-41.9-4-64s1.4-43.5 4-64l-90.8 0zM327.5 468.3c57.8-19.5 105-61.8 130.9-116.3l-83.8 0c-9.6 47.6-26.2 88-47.2 116.3zm-143 0c-21-28.3-37.5-68.8-47.2-116.3l-83.7 0c25.9 54.5 73.1 96.9 130.9 116.3zM256 512A256 256 0 1 1 256 0a256 256 0 1 1 0 512z"
			fill="var(--icon-fg)"
		/>
	</svg>`,
};

export type Kind = keyof typeof icons;

/**
 * A resource in the resource list
 */
@customElement('ile-resource')
export class Resource extends LitElement {
	static styles = css`
		:host {
			display: flex;
			align-items: center;
			gap: 0.5em;
			border-radius: 0.5em;
			cursor: pointer;
			border: 1px solid transparent;
		}

		:host(:hover) {
			background: #222;
		}

		:host(.selected) {
			border: 1px solid #555;
			background: #333;
			color: #fff;
		}

		div {
			padding: 0.25em 0.75em 0.25em 0.5em;
		}
	`;

	@property() public accessor kind: Kind = 'generic';

	@property() public accessor title: string = '';

	public accessor contents: string = '';

	protected _renderedContents?: TemplateResult | string;

	public constructor() {
		super();
		this.id = 'resource-' + Date.now();
		document.querySelector<HTMLElement>('#resources')!.prepend(this);
	}

	public render() {
		return html`<div @click=${this.select}>${this.kind ? icons[this.kind] : nothing} ${this.title}</div> `;
	}

	protected renderContents() {
		switch (this.kind) {
			case 'generic':
				return this.contents;
			case 'document': {
				const md = parseMD(this.contents, { async: false });
				return html(Object.assign([md], { raw: [md] }) as TemplateStringsArray);
			}
			case 'audio':
			case 'video':
				return html`<video src="${this.contents}" controls></video>`;
			case 'website':
				// iframe
				return html`<iframe src="${this.contents}" width="100%" height="100%"></iframe>`;
		}
	}

	protected select = () => {
		this._renderedContents ??= this.renderContents();
		document.querySelectorAll<Resource>('ile-resource.selected').forEach(resource => resource.classList.remove('selected'));
		this.classList.add('selected');

		render(
			html`
				<div class="header">
					<h1>${this.title}</h1>
				</div>
				<div class="body" kind="${this.kind}">${this._renderedContents}</div>
			`,
			document.querySelector<HTMLElement>('#content')!
		);
	};
}

/**
 * Add a new document resource
 * @param title - The title of the resource
 * @param contents - The full contents of the resource
 * @returns The newly created resource
 */
export function addDocument(title: string, contents: string = ''): Resource {
	if (!title) throw new Error('Resource title is required');
	const resource = new Resource();
	resource.kind = 'document';
	resource.title = title;
	resource.contents = contents || '';

	return resource;
}

/** Add a new website resource */
export function addWebsite(url: string, title: string = ai.createTitle(url)): Resource {
	const resource = new Resource();
	resource.kind = 'website';
	resource.title = title;
	resource.contents = url;
	return resource;
}
