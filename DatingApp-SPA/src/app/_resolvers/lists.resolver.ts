import { AlertifyService } from './../_services/alertify.service';
import {Injectable} from '@angular/core';
import { User } from '../_models/User';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likeParams = 'Likers';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line:no-string-literal
        return this.userService.getUsers(this.pageNumber, this.pageSize , null , this.likeParams).pipe(
            catchError(error => {
                this.alertify.error('Problem retrievig data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
