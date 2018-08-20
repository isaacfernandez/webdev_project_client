import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: ProfileService,
    private userService: UserService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));

  }

  username;
  firstName;
  lastName;
  id;
  dateOfBirth: Date;

  update() {
    var update_obj = {
      'username': this.username,
      'firstName': this.firstName || "Mike",
      'lastName': this.lastName || "Hunt"
    }
    this.userService.loggedIn()
      .then(resp => {
        if (resp._id !== undefined) {
          return resp._id;
        }
      }).then( id => {
        console.log(id);
        this.userService.updateUser(update_obj, id);
    });
  }

  setParams(params) {
    this.id = params['userId'];
    if (this.id !== undefined) {
      this.service.profileById(this.id)
        .then(resp => {
          this.username = resp.username;
          this.firstName = resp.firstName;
        });
    } else {
      this.service.profile()
        .then(resp => {
          this.username = resp.username;
          this.firstName = resp.firstName;
          this.lastName = resp.lastName;
          this.dateOfBirth = resp.dateOfBirth;
        })
    }
  }

  ngOnInit() {

  }

}
