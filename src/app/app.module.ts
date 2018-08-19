import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { ProfileComponent } from './profile/profile.component';
import {routing} from './app.routing';
import {UserService} from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    FeedListComponent,
    UserComponent,
    UserListComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    LoginRegisterComponent
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
