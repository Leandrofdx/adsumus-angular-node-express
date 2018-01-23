import { Component, OnInit } from '@angular/core';
import { Page } from '../pages/models/page.model'
import {Observable} from 'rxjs/Observable'
import { PageService } from '../pages/services/page.services'
import {trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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

export class HomeComponent implements OnInit {
	
	public state = 'ready'

	public pages: Page[]

  constructor(private pageService: PageService) { }

  ngOnInit() {
  	 this.pageService.getPages()
     .subscribe(pages => this.pages = pages)
  }

}
