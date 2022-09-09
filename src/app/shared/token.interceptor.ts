import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { UserService } from './user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: UserService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {    
    const token = this.tokenService.GetToken()

    // SI token à insérer dans le header
    if(token !== null){
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'bearer '+token)
      })
      return next.handle(clone).pipe(
        catchError(error => {
          console.log(error)

          if(error.status === 401){
            this.tokenService.clearTokenExpired()
          }
          return throwError('Session Expired')
        })
      )
    }
    
    
    return next.handle(request);
  }
}


export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}