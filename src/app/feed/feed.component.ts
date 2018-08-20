import {Component, OnInit} from '@angular/core';
import {FeedService} from '../services/feed.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private feedService: FeedService,
              private userService: UserService,
              private route: ActivatedRoute) {
    this.route.params.subscribe(
      params => this.feedId = params['feedId']);
  }

  newLink;
  newTitle;
  isLoggedIn = true;
  isModerator = true;
  isFollowing = true;
  currentUser = {
    _id: 0
  };
  feedId;
  feed = {
    _id: 0,
    feedName: String,
    externalPosts: [],
    internalPosts: [],
    feedFollows: []
  };
  posts = [{
    postTitle: String,
    postLink: String
  }];
  postIds = [];
  postLimit = 10;

  getFeed() {
    return this.feedService.findFeedById(this.feedId);
  }

  getCurrentUser() {
    // this.userService.
    // SET isLoggedIn and isModerator and isFollowing
    return null;
  }

  getPostIds() {
    const postIds = [];
    postIds.concat(this.feedService.findInternalPostsById(this.feed.feedName,
      this.postLimit));
    postIds.concat(this.feedService.findExternalPostsByName(this.feed.feedName,
      this.postLimit));
    return postIds;
  }

  getPosts(postIds) {
    postIds.splice(this.postLimit);
    return this.feedService.findPostsByIds(postIds);
  }

  followFeed() {
  }

  deletePost() {
  }

  createPost(title, link) {
    const post = {
      postTitle: title,
      postLink: link
    };
    this.feedService.createPostForFeed(this.feed._id, post)
      .then(response => {
        if (response.error == null) {
          alert('Post created successfully.');
        } else {
          alert(response.error);
        }
      });
  }

  ngOnInit() {
    this.getFeed()
      .then(response => {
        if (response.error == null) {
          this.feed = response;
          // console.log(this.feed);
          this.postIds = this.getPostIds();
          this.posts = this.getPosts(this.postIds);
        } else {
          alert(response.error);
        }
      });
    // this.getCurrentUser()
    //   .then(response => this.currentUser = response);
  }
}
