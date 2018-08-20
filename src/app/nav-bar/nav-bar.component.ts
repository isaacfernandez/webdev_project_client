import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private service: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.setParams(params));
  }

  loggedIn = false;
  username = '';
  admin = false;

  setParams(params) {
    console.log('reloading');
    this.service.loggedIn()
      .then(resp => {
        if (resp._id !== undefined) {
          this.loggedIn = true;
          this.username = resp.username;
          this.admin = (resp.role === 'ADMIN');
        }
      });
  }

  logout() {
    this.service.logout()
      .then(res => this.router.navigate(['/login']))
      .then( res => window.location.reload())
  }

  ngOnInit() {
  }

}
