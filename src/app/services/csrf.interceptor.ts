import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler):
      Observable<HttpEvent<any>> {
    let csrfCookie = '';
    if (document.cookie) {
      const cookies = document.cookie.split(';');
      csrfCookie = cookies.find(cookie => {
        return cookie.indexOf('csrftoken=') === 0;
      }) ||
          '';
      csrfCookie = csrfCookie.replace('csrftoken=', '');
    }
    const newReq = req.clone({setHeaders: {'X-CSRFToken': csrfCookie}});
    return next.handle(newReq);
  }
}
