/**
	@license
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	https://open.grupoconectate.com/LICENSE.txt The complete set of authors may be found at
	https://open.grupoconectate.com/AUTHORS.txt The complete set of contributors may be
	found at https://open.grupoconectate.com/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at https://open.grupoconectate.com/PATENTS.txt
 */

import { PropertyValues, html } from "lit";

import { CtInput } from "./ct-input.js";
import { customElement, unsafeHTML } from "./ct-lit.js";

/**
 * # `ct-input-open`
 *
 * @group lit-ct-components
 * @element ct-input-open
 */
@customElement("ct-input-open")
export class CtInputOpen extends CtInput {
	render() {
		return html`${unsafeHTML(`<style>${CtInput.styles.map(s => s.toString())}</style>`)}${super.render()}`;
	}
	createRenderRoot() {
		return this;
	}

	private readonly _fieldUid = `ct-input-${Math.random().toString(36).slice(2, 9)}`;

	protected override updated(changed: PropertyValues) {
		super.updated(changed);
		const input = this.querySelector("input[part='input']");
		if (!(input instanceof HTMLInputElement)) return;
		if (input.id !== this._fieldUid) {
			input.id = this._fieldUid;
			input.dataset.fieldUid = this._fieldUid;
			this.querySelectorAll("[for='input']").forEach(label => label.setAttribute("for", this._fieldUid));
		}
		const error = this.querySelector(".float-label.error");
		const count = this.querySelector(".charCount");
		if (error) error.id = `${this._fieldUid}-error`;
		if (count) count.id = `${this._fieldUid}-count`;
		const described = [error ? error.id : "", count ? count.id : ""].filter(Boolean).join(" ");
		if (described) input.setAttribute("aria-describedby", described);
		else input.removeAttribute("aria-describedby");
	}
}
