import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../services/profile.service';
import {UserService} from '../services/user.service';
import {FeedService} from '../services/feed.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: ProfileService,
    private userService: UserService,
    private feedService: FeedService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  currentUser = {
    _id: 0,
    username: String,
    firstName: String,
    lastName: String
  };

  userPage = {
    username: String,
    firstName: String,
    lastName: String,
    userFollowers: [],
    _id: 1
  };

  idCheck;

  followers = [];

  // username;
  // firstName;
  // lastName;
  // userId = undefined;
  // dateOfBirth: Date;

  update() {
    const update_obj = {
      'username': this.userPage.username,
      'firstName': this.userPage.firstName || 'Simon',
      'lastName': this.userPage.lastName || 'Bolivar'
    };
    this.userService.loggedIn()
      .then(resp => {
        if (resp._id !== undefined) {
          return resp._id;
        }
      }).then( id => {
        // console.log(id);
        this.userService.updateUser(update_obj, id);
    });
  }

  setParams(params) {
    this.userPage._id = params['userId'];
    this.idCheck = params['userId'];
    if (this.userPage._id !== undefined) {
      this.service.profileById(this.userPage._id)
        .then(resp => {
          this.userPage = resp;
          console.log(this.userPage);
          // this.userPage.userId = resp._id;
          // this.userPage.username = resp.username;
          // this.userPage.firstName = resp.firstName;
          // this.userPage.followerIds = [];
        });
    } else {
      this.service.profile()
        .then(resp => {
          this.userPage = resp;
        });
    }
  }

  getCurrentUser() {
    return this.userService.loggedIn();
  }

  ngOnInit() {
    this.getCurrentUser()
      .then(response => {
        if (response.error == null) {
          this.currentUser = response;
        }
      });
  }

}
