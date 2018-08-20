import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private service: UserService) {
    this.reloadUsers();
  }

  users = [];

  deleteUser(id) {
    this.service.deleteUser(id)
      .then( res => this.reloadUsers());
  }

  updateUser(modifiedUser) {
    var user = {role : modifiedUser.role}
    this.service.updateUser(user, modifiedUser._id)
      .then( res => this.reloadUsers());
  }


  reloadUsers() {
    this.service.users().then(res => this.users = res );
  }

  ngOnInit() {
  }

}
