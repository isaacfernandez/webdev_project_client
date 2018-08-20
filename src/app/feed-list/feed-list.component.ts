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
  newName;
  isLoggedIn = true;
  isModerator = true;
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

  searchFeeds(query) {

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

  deleteFeed(feedId) {

  }

  followFeed(feedId) {

  }

  setFeeds() {
    // return this.feedService.findFeedById(this.feedId);
  }

  ngOnInit() {
    this.getFeeds();
  }

}
