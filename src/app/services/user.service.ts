import {Injectable} from '@angular/core';
import {register} from "ts-node";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'https://guarded-forest-81137.herokuapp.com/api/';

  constructor() {
  }

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

  users = () => {
    return fetch(this.url + 'user', {
      method: 'get',
      credentials: 'include',
    })
      .then(response => response.json());
  }
// /api/login/loggedin
// get  /api/user/id/follows/100
// post /api/user/id/follows/id
  getFollowedUsers = (id) => {
    return fetch(this.url + 'user/' + id + '/follows/20', {
      method: 'get',
      credentials: 'include'
    })
      .then(response => response.json());
  }

  getFollowingUsers = (id) => {
    return fetch(this.url + 'user/' + id + '/followers/20', {
      method: 'get',
      credentials: 'include'
    })
      .then(response => response.json());
  }

  followUser = (ourId, targetId) => {
    return fetch(this.url + 'user/' + ourId + '/follows/' + targetId, {
      method: 'post',
      credentials: 'include'
    })
      .then(response => response.json())
  }

  unfollowUser = (from, targetId) => {
    //delete('/api/user/:userId/follows/:followedId', unfollowUser)
    return fetch(this.url + 'user/' + from + '/follows/' + targetId, {
      method: 'delete',
      credentials: 'include'
    })
      .then(response => response.json())
  }

  createUser = (user) => {
    return fetch(this.url + 'user/createUser', {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
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

  loggedIn() {
    return fetch(this.url + 'login/loggedin', {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  logout() {
    return fetch(this.url + 'logout', {
      method: 'post',
      credentials: 'include'
    }).then(res => res.status);
  }

  deleteUser(id) {
    return fetch(this.url + 'user/' + id, {
      method: 'delete',
      credentials: 'include'
    }).then(res => res.status);
  }

  updateUser(user: any, id) {
    return fetch(this.url + 'user/' + id, {
      method: 'put',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  }

  getLastPost(id: any) {
    return fetch(this.url + 'post/user/' + id, {
      method: 'get',
      credentials: 'include',
    }).then(res => {
      return res.json();
    });
  }

  searchUsers(search) {
    return fetch(this.url + 'user/search/' + search, {
      method: 'get',
      credentials: 'include'
    }).then(res => res.json());
  }

  getPostsByUser(userId) {
    return fetch(this.url + 'post/user/' + userId, {
      method: 'get',
      credentials: 'include'
    }).then(res => res.json());
  }
}
