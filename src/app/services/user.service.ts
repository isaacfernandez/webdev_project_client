import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://guarded-forest-81137.herokuapp.com/api/';
  constructor() { }

  login = (user) => {
    return fetch(this.url + 'login', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json());
  }

  register = (user) => {
    return fetch(this.url + 'register', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json());
  }
}
