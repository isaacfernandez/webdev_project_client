import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  registerUsername: '';
  registerPassword: '';
  registerPassword2: '';

  loginUsername: '';
  loginPassword: '';
  displayRegister;

  user = {
    username: String,
    password: String,
    password2: String
  };

  constructor(private router: Router,
              private userService: UserService) {
  }

  login = (user) => {
    this.userService.login(user)
      .then(response => {
        if (response.error == null) {
          return this.router.navigate(['/profile'])
            .then( res => window.location.reload())
        } else {
          alert('Failed to login. ' + response.error);
        }
      });
  };

  register = (user) => {
    if (user.password === user.password2) {
      const newUser = {
        username: user.username,
        password: user.password,
        role: 'USER'
      };
      this.userService.register(newUser)
        .then(response => {
          if (response.error == null) {
            return this.router.navigate(['/profile'])
              .then( () =>window.location.reload());
          } else {
            alert('Register failed. ' + response.error);
          }
        });
    } else {
      alert('Passwords must match.');
    }
  };

  toggle = () => {
    this.displayRegister = !this.displayRegister;
  };

  ngOnInit() {
    this.displayRegister = false;
  }
}
