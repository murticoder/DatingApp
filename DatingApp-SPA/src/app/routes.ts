import { MemberListResolver } from './_resolvers/memeber-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { MessagesComponent } from './messages/messages.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';

export const appRoutes: Routes = [
    {path: '' , component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path : 'members' , component : MemberListComponent , resolve: {users: MemberListResolver}},
            {path : 'members/:id' , component : MemberDetailComponent , resolve: {user: MemberDetailResolver}},
            {path : 'messages' , component : MessagesComponent},
            {path : 'lists' , component : ListsComponent},
        ]
    },
    // {path : 'members' , component : MemberListComponent , canActivate : [AuthGuard]},
    // {path : 'messages' , component : MessagesComponent},
    // {path : 'lists' , component : ListsComponent},
    {path : '**' , redirectTo : '' , pathMatch : 'full'}

];
