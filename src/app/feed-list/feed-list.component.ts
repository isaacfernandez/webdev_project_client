import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {FeedService} from '../services/feed.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {

  constructor(private userService: UserService,
              private feedService: FeedService) {
  }

  feedName;
  feedSearch = '';
  searchCalled = false;
  userId = '';
  username = '';
  followed = [];
  isLoggedIn = true;
  isElevated = false;

  feeds = [
  ];
  feedLimit = '10';

  getFeeds() {
    this.feedService.findFeeds(this.feedLimit)
      .then( preproc => {
        if (this.userId === '' || this.searchCalled === true) {
          return preproc;
        } else {
          return preproc.filter(feed => this.followed.indexOf(feed._id) > -1);
        }
      })
      .then(feeds => this.feeds = feeds);
  }

  searchFeeds() {
    this.searchCalled = true;
    if (this.feedSearch.length !== 0) {
      this.feedService.findFeedsByName(this.feedSearch)
        .then(feeds => this.feeds = feeds);
    } else {
      this.getFeeds();
    }
  }

  createFeed() {
    console.log('feedName');
    console.log(this.feedName);
    this.feedService.createFeed(this.feedName)
      .then(feed => {
        this.feeds.push(feed);
      });
  }

  deleteFeed(feedId, feedName) {
    if (window.confirm('Delete feed ' + feedName + '?')) {
      this.feedService.deleteFeed(feedId)
        .then(() => {
          this.getFeeds();
        });
    }
  }

  followFeed(feedId) {
    this.feedService.followFeed(feedId, this.userId)
      .then(response => {alert('Successfully followed feed')});
  }

  ngOnInit() {
    this.getFeeds();
    this.userService.loggedIn()
      .then(resp => {
        if (resp._id !== undefined) {
          this.isLoggedIn = true;
          this.username = resp.username;
          console.log('resp');
          console.log(resp);
          this.isElevated = (resp.role === 'MODERATOR' || resp.role === 'ADMIN');
          this.userId = resp._id;
          return this.userId;
        }
      })
      .then( id => {
        return this.feedService.userFeedFollows(id);
      })
      .then( feedFollows => {
        for (var ff in feedFollows) {
          this.followed.push( feedFollows[ff].feed);
        }
        return this.followed;
      }).then( we => {
      this.getFeeds()
    });
  }

}
