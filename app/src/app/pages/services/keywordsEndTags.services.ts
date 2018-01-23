import {Injectable} from '@angular/core'
import { NotificationService } from '../../shared/notification.service'

@Injectable()
export class keywordsEndTags {

	constructor(private notificationService: NotificationService,){}

	public keywords = { key: [] }
	public tags = { key: [] }

	validate(key, type) {

		if (key != '') {
			console.log(key)
			if (type == 'keyword') {
				this.addKeyword(key)
			} else { 
				this.addTag(key)
			}
		}     
	}

	addKeyword(key) {
		let keywords = this.keywords.key.find((mItem)=> mItem === key)

		if (!keywords) {
			this.keywords.key.push(key);
			this.notificationService.notify(`Adicionou a palavra chave ${key} com sucesso.`)
			return
		}
	}

	addTag(key) {
		let tags = this.tags.key.find((mItem)=> mItem === key)
		if (!tags) {
			this.tags.key.push( key);
			this.notificationService.notify(`Adicionou a tag ${key} com sucesso.`)
		}
	}

	remove(key, type) {
		if (type == 'keyword') {
			this.keywords.key.splice(this.keywords.key.indexOf(key), 1)
			this.notificationService.notify(`Removeu a ${key} com sucesso.`)
			return
		}

		this.tags.key.splice(this.tags.key.indexOf(key), 1)
		this.notificationService.notify(`Removeu a ${key} com sucesso.`)
	}

	getKeywords() {
		return this.keywords
	}

	getTags() {
		return this.tags
	}
}