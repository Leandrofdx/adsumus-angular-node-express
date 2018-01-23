import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'page', 
    templateUrl: './page.component.html'
})
export class PageComponent { 
	_id: string;
	name: string
	slug: string
	title: string
	description: string
	keywords: Array<string>
	tags: Array<string>
}