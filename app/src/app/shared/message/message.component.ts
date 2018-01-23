import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from "@angular/animations"

import {NotificationService} from '../notification.service'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/switchMap'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        display: 'none',
        bottom: '100px'
      })),
      state('visible', style({
        display: 'block',
        bottom: '150px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})

export class MessageComponent implements OnInit {

  message: string

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .do(message=>{
        this.message = message
        this.snackVisibility = 'visible'
    }).switchMap(message => Observable.timer(3000))
      .subscribe(timer=> this.snackVisibility = 'hidden')
  }

}
