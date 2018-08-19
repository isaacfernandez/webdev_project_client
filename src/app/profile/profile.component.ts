import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../services/profile.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private service: ProfileService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));

  }

  username;
  firstName;
  lastName;
  id;
  dateOfBirth: Date;

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
