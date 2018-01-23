import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'

import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Page } from '../models/page.model'
import { API } from '../../app.api'

@Injectable()
export class PageService {

	constructor(private http: HttpClient){}

	addPage(page: Page): Observable<string> {
		return this.http.post<Page>(`${API}/pages`, page).map(page => page.slug)
	}

	getPages(): Observable<Page[]>{
		return this.http.get<Page[]>(`${API}/pages/`)
	}

	getPageSlug(slug): Observable<any>{
		return this.http.get<Page[]>(`${API}/pages/${slug}`)
	}

	putPageSlug(page) {
		return this.http.put<Page>(`${API}/pages/${page.slug}`, page)
	}

	removePageSlug(slug): Observable<any> {
		return this.http.delete(`${API}/pages/${slug}`);
	}
}