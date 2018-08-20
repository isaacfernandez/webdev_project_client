import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ProfileService} from '../services/profile.service';
import {post} from '../../../node_modules/@types/selenium-webdriver/http';

@Component({
  selector: 'app-follows-list',
  templateUrl: './user-follows.component.html',
  styleUrls: ['./user-follows.component.css']
})
export class UserFollowsComponent implements OnInit {

  users = [];
  myId;

  constructor(private service: UserService,
              private profileService: ProfileService) {
    this.service.loggedIn()
      .then(resp => {
        var selfId = resp._id;
        if (selfId == undefined) {
          console.log('Not logged in, go home');
          return;
        }
        this.myId = selfId;
        this.service.getFollowedUsers(selfId)
          .then(ret => {
            console.log(ret);
            for (var u in ret) {
              this.userIdToUser(ret[u].followed);
            }
            console.log(this.users);
          })
          .then(res => {
            for (var i = 0; i < this.users.length; i++) {
              this.users[i].lastPost = this.getLastUserPost(this.users[i]._id);
            }
          });
      });
  }

  userIdToUser(id) {
    console.log(id);
    this.profileService.profileById(id).then(res => this.users.push(res));
  }

  unfollowUser(id) {
    this.service.unfollowUser(this.myId, id)
      .then(res => {
        this.service.getFollowedUsers(this.myId)
          .then(ret => {
            console.log(ret);
            for (var u in ret) {
              this.userIdToUser(ret[u].followed);
            }
            for (var i = 0; i < this.users.length; i++) {
              this.users[i].post = this.getLastUserPost(this.users[i]);
            }
          });
      });
  }

  ngOnInit() {
  }

  private getLastUserPost(user) {
    var _id = user._ud;
    return this.service.getLastPost(_id).then(res => {
      console.log(res);
      return res;
    }).then(posts => {
      if (posts.length == 0) return null;
      return posts[0];
    });
  }
}
