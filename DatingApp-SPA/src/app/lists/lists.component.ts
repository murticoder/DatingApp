import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Pagination, PaginatedResult } from './../_models/Pagination';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likeParams: string;
  constructor(private authService: AuthService , private userService: UserService ,
              private activatedRoute: ActivatedRoute , private alertify: AlertifyService ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.users = data['users'].result;
      // tslint:disable-next-line:no-string-literal
      this.pagination = data['users'].pagination;
    });
    this.likeParams = 'Likers';
  }



  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage , null , this.likeParams)
          .subscribe((result: PaginatedResult<User[]>) => {
                this.users = result.result;
                this.pagination = result.pagination;
              }, error => {
                this.alertify.error(error);
              });

            }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

}
