import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private service: UserService) {
    this.reloadUsers();
  }

  newUser = {};
  
  currentUser = {
    role: ''
  };
  users = [];

  deleteUser(id) {
    this.service.deleteUser(id)
      .then( res => this.reloadUsers());
  }

  createUser(newUser) {
    console.log(newUser);
    this.service.createUser(newUser)
      .then(res => {
        if (res.error == null) {
          this.users.push(res);
        } else {
          alert(res.error);
        }
      })
  }

  updateUser(modifiedUser) {
    var user = {
      role: modifiedUser.role,
      firstName: modifiedUser.firstName,
      lastName: modifiedUser.lastName,
      dateOfBirth: modifiedUser.dateOfBirth,
      password: modifiedUser.password
    }
    this.service.updateUser(user, modifiedUser._id)
      .then(res => this.reloadUsers());
  }


  reloadUsers() {
    this.service.users().then(res => this.users = res );
  }

  getCurrentUser() {
    return this.service.loggedIn();
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
