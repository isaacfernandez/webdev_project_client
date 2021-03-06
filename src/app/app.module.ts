import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFollowsComponent} from "./user-follows/user-follows.component";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component';
import {routing} from './app.routing';
import {UserService} from './services/user.service';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    FeedListComponent,
    UserComponent,
    UserListComponent,
    UserFollowsComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    LoginRegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
