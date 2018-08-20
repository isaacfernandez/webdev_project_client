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
  feedSearch;
  userId = '';
  username = '';
  isLoggedIn = true;
  isElevated = false;

  newName;

  currentUser = {
    _id: 0,
  feedFollows: []
  };
  feeds = [
  ];
  feedLimit = '10';

  getFeeds() {
    this.feedService.findFeeds(this.feedLimit)
      .then(feeds => this.feeds = feeds);
  }

  searchFeeds() {
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
        console.log('hi');
        console.log(feed);
        this.feeds.push(feed);
      });
  }

  deleteFeed(feedId, feedName) {
    if (window.confirm('Delete feed ' + feedName + '?') {
      this.feedService.deleteFeed(feedId)
        .then(() => {
          getFeeds();
        });
    }
  }

  followFeed(feedId) {
    this.feedService.followFeed(feedId, this.userId)
      .then(response => {alert('Successfully followed feed')});
  }

  setFeeds() {
    // return this.feedService.findFeedById(this.feedId);
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
          this.isModerator = (resp.role === 'MODERATOR' || resp.role === 'ADMIN');
          console.log('isModerator: ' + this.isModerator);
          this.isModerator = true;
          this.userId = resp._id;
        }
      });
  }

}
