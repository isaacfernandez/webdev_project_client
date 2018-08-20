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
    _id: 0,
    role: ''
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
    return this.userService.loggedIn();
  }

  getPostIds() {
    let postIds = [];
    return this.feedService.findInternalPostsByName(this.feed.feedName,
      this.postLimit)
      .then(ids => {
        // console.log(ids);
        // console.log(postIds);
        postIds = postIds.concat(ids);
        // console.log(postIds);
        return postIds;
      })
      .then(() => {
        // console.log(postIds);
        return this.feedService.findExternalPostsByName(this.feed.feedName,
          this.postLimit)
          .then(ids => {
            // console.log(ids);
            // console.log(postIds);
            postIds = postIds.concat(ids);
            // console.log(postIds);
            this.postIds = postIds;
            return postIds;
          });
      });
    // .then(ids => {
    //   console.log(ids);
    //   postIds.push(ids.);
    //   console.log(postIds);
    // });
    // postIds.concat(this.feedService.findExternalPostsByName(this.feed.feedName,
    //   this.postLimit));
  }

  getPosts(postIds) {
    // console.log(postIds);
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
          this.getPostIds()
            .then((ids) => {
              this.postIds = ids;
              // console.log(ids);
              this.posts = this.getPosts(ids);
            });
        } else {
          alert(response.error);
        }
      });
    this.getCurrentUser()
      .then(response => {
        if (response.error == null) {
          this.currentUser = response;
          this.isLoggedIn = true;
          this.isModerator = (this.currentUser.role !== 'USER');
          // this.isFollowing = false;
        } else {
          this.currentUser = null;
          this.isLoggedIn = false;
          this.isModerator = false;
          this.isFollowing = false;
        }

        console.log(this.currentUser);
        console.log(this.isLoggedIn);
        console.log(this.isModerator);
        console.log(this.isFollowing);
      });
  }
}
