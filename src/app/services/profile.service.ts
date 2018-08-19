import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  PROFILE_URL = 'https://guarded-forest-81137.herokuapp.com/api/profile/';

  constructor() { }

  profile() {
    return fetch(this.PROFILE_URL,{
      credentials: 'include', // include, same-origin, *omit
    })
      .then(response => response.json());
  }

  profileById(userId) {
    return fetch('https://guarded-forest-81137.herokuapp.com/api/user/id/' + userId,{
      credentials: 'include', // include, same-origin, *omit
    })
      .then(response => response.json());
  }
}
