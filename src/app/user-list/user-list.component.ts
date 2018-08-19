import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];
  meId;

  constructor(private service: UserService) {
    this.service.loggedIn()
      .then(resp => {
        if (resp._id !== undefined) {
          this.meId = resp._id;
        }
      });

    this.service.users()
      .then(resp => this.users = resp);
  }

  followUser(them) {
    if (this.meId == undefined || this.meId === null) {
      alert("Must be logged in to follow");
      return;
    }
    this.service.followUser(this.meId, them)
      .then(res =>
        console.log(res)
      );
  }

  ngOnInit() {
  }

}
