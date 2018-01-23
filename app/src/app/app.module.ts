import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { APP_BASE_HREF } from '@angular/common';
import { ROUTES } from './app.routes'


import { PageService } from './pages/services/page.services';
import { NotificationService }  from './shared/notification.service'
import { keywordsEndTags } from './pages/services/keywordsEndTags.services'
import { MountSlug } from './pages/services/mountSlug.service'

import { TextLess } from './shared/pipes/less.pipe'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages/pages.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MessageComponent } from './shared/message/message.component';
import { PageComponent } from './pages/page/PageComponent'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    PageComponent,
    TextLess
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [PageService, NotificationService, keywordsEndTags, MountSlug, {provide: LOCALE_ID, useValue: 'pt-BR'}, {provide: APP_BASE_HREF, useValue : '/' }, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }