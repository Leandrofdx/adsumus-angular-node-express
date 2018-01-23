import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {trigger, state, style, transition, animate} from '@angular/animations'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'

import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'

import { Page } from '../pages/models/page.model'
import { PageComponent } from './page/PageComponent'

import { PageService } from '../pages/services/page.services'
import { NotificationService } from '../shared/notification.service'
import { keywordsEndTags } from '../pages/services/keywordsEndTags.services'
import { MountSlug } from '../pages/services/mountSlug.service'


@Component({
	selector: 'app-pages',
	templateUrl: './pages.component.html',
	 animations: [
	    trigger('efect', [
	      state('ready', style({opacity: 1})),
	      transition('void => ready', [
	        style({opacity: 0, transform: 'translate(-30px, -10px)'}),
	        animate('300ms 0s ease-in-out')
	      ])
	    ])
	  ]
})

export class PagesComponent implements OnInit {
	
	public state = 'ready'

	public page
	activeForm = true
	FormAddPage: FormGroup;
	public keywords
	public tags

	constructor(

		private pageService: PageService, 
		private notificationService: NotificationService,
		private keywordsEndTags: keywordsEndTags,
		private mountSlug: MountSlug,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder
		) {

		this.route.params.subscribe(params => {

			let slug = params['slug'];

			if(slug) {

				this.pageService.getPageSlug(this.route.snapshot.params['slug'])
				.subscribe(page => this.page = page,
					response => 
					this.notificationService.notify(response.error.message),
					()=>{
						this.putKeywordsEndTagsDatabase()
					})
				this.activeForm = false
			}
		});

		this.FormAddPage = fb.group({

			name: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			slug: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			description: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
		});

		this.keywords = this.keywordsEndTags.getKeywords()
		this.tags = this.keywordsEndTags.getTags()
	}


	ngOnInit(){}

	validate(key, type) {

		this.keywordsEndTags.validate(key.value, type)
		key.value = ''
	}

	remove(key, type) {

		this.keywordsEndTags.remove(key, type)

	}

	generatePage() {

		let page = this.interfacePage()
		this.pageService.addPage(page).subscribe(
			res => { 
				this.notificationService.notify(`Página ${this.FormAddPage.value.name} foi gerada com sucesso.`)
				this.FormAddPage.reset();
			}
		)
	}

	alterPage() {

		let page = this.interfacePage()
		this.pageService.putPageSlug(page).subscribe(
			res => { 
				this.notificationService.notify(`Página ${this.FormAddPage.value.name} alterada com sucesso.`)
				this.FormAddPage.reset();
				this.router.navigate(['/']); 
			}
		)
	}

	putKeywordsEndTagsDatabase(){

		this.page.keywords.key.map(item => this.keywordsEndTags.addKeyword(item))
		this.page.tags.key.map(item => this.keywordsEndTags.addTag(item))

	}

	removePage(slug) {

		this.pageService.removePageSlug(slug).subscribe(
			res => { 
				this.notificationService.notify(`Página Excluida com sucesso.`)
				this.FormAddPage.reset();
				this.router.navigate(['/']); 
			}
		)
	}

	interfacePage() {

		let page: Page = new Page (
			this.FormAddPage.value.name,
			this.mountSlug.trim(this.FormAddPage.value.slug),
			this.FormAddPage.value.title,
			this.FormAddPage.value.description,
			this.keywords,
			this.tags
			)    

		return page
	}
}