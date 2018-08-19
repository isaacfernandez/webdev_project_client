import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {FeedComponent} from './feed/feed.component';
import {UserListComponent} from "./user-list/user-list.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/:userId', component: ProfileComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'feed/:feedId', component: FeedComponent},
  {path: 'users', component: UserListComponent}
];
export const routing = RouterModule.forRoot(appRoutes);

