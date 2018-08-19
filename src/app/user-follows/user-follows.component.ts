import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ProfileService} from "../services/profile.service";

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
          console.log("Not logged in, go home");
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
          });
      })
  }

  userIdToUser(id) {
    console.log(id);
    this.profileService.profileById(id).then( res => this.users.push(res));
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
            console.log(this.users);
          });
      })
  }

  ngOnInit() {
  }

}
