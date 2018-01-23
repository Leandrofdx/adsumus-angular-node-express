import {Injectable} from '@angular/core'
import { NotificationService } from '../../shared/notification.service'

@Injectable()
export class MountSlug {

  constructor(private notificationService: NotificationService,){}
  
  public trim (slug) { 
    while(slug.indexOf(" ") != -1)
      slug = slug.replace(" ", "-");
    return this.slugCase(slug)
  }

  public slugCase(slug) {

    var strActive = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    var strInative = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";

    var Newstr="";
    var i = 0

    for(i=0; i< slug.length; i++) {
      var change=false;
      for (var j=0; j< strActive.length; j++) {
        if (slug.substr(i,1)==strActive.substr(j , 1)) {
          Newstr+=strInative.substr(j , 1);
          change=true;
          break;
        }
      }
      if (change==false) {
        Newstr+=slug.substr(i,1);
      }
    }
    return Newstr;
  }
}