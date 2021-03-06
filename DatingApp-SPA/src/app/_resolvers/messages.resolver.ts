import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/Message';


@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        // tslint:disable-next-line:no-string-literal
        return this.userService.getMessages(this.authService.decodedToken.nameid,
                                            this.pageNumber, this.pageSize , this.messageContainer).pipe(
            catchError(error => {
                this.alertify.error('Problem retrievig messages');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
