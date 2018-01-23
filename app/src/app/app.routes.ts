import {Routes} from '@angular/router'

import { HomeComponent } from './home/home.component'
import { PagesComponent } from './pages/pages.component'

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'pages', component: PagesComponent},
  {path: 'pages/:slug', component: PagesComponent}

]