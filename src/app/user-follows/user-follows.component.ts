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
            for (var u in ret) {
              this.userIdToUser(ret[u].followed);
            }
          }).then(cont => {
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
    let olduser;
    this.profileService.profileById(id).then(res => {
      olduser = res;
      return this.getLastUserPost(res);
    })
      .then(post => {
        if (post !== null) {
          olduser.postTitle = post.postTitle;
          olduser.postLink = post.postLink;
        } else {
          olduser.postTitle = 'No recent posts';
          olduser.postLink = 'Lame, right?';
        }
        this.users.push(olduser);
        console.log(olduser);
      });

  }

  unfollowUser(id) {
    this.service.unfollowUser(this.myId, id)
      .then(res => {
        this.service.getFollowedUsers(this.myId)
          .then(ret => {
            for (var u in ret) {
              this.userIdToUser(ret[u].followed);
            }
          });
      });
  }

  ngOnInit() {
  }

  getLastUserPost(user) {
    var _id = user._id;
    return this.service.getLastPost(_id).then(res => {
      console.log(res);
      return res;
    }).then(posts => {
      console.log(posts);
      if (posts.length == 0) return null;
      console.log('returning a post!');
      return posts[0];
    });
  }
}
