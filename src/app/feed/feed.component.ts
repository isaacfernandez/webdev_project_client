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
  isLoggedIn = false;
  isModerator = false;
  isFollowing = false;
  currentUser = {
    _id: 0,
    role: '',
    feedFollows: []
  };
  feedId;
  feedFollowersCount = 0;
  feed = {
    _id: 0,
    feedName: String,
    externalPosts: [],
    internalPosts: [],
    feedFollows: []
  };
  posts = [{
    _id: 0,
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

  getFeedFollowersCount() {
    return this.feedService.findFeedFollowerCount(this.feedId);
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

  isUserFollowingFeed() {
    this.feedService.isUserFollowingFeed(this.currentUser._id, this.feedId)
      .then(response => {
        // console.log(response);
        if (response.error == null) {
          this.isFollowing = true;
          // console.log(this.isFollowing);
        } else {
          this.isFollowing = false;
        }
      });
  }

  followFeed() {
    this.feedService.followFeed(this.feed._id, this.currentUser._id)
      .then(response => {
        if (response.error == null) {
          alert('Feed followed successfully.');
        } else {
          alert(response.error);
        }
      });
  }

  deletePost(postId) {
    if (this.feed.externalPosts.includes(postId)) {
      this.feedService.deleteExternalPost(postId)
        .then(response => {
          if (response.ok) {
            alert('Post deleted successfully.');
          } else {
            alert('Post delete failed.');
          }
        })
        .then(() => this.populatePosts());

    } else {
      this.feedService.deleteInternalPost(postId)
        .then(response => {
          if (response.ok) {
            alert('Post deleted successfully.');
          } else {
            alert('Post delete failed.');
          }
        })
        .then(() => this.populatePosts());
    }
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
      })
      .then(() => this.populatePosts());
  }

  populatePosts = () => {
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
  };

  ngOnInit() {
    this.populatePosts();
    this.getCurrentUser()
      .then(response => {
        if (response.error == null) {
          this.currentUser = response;
          // console.log(this.currentUser);
          this.isLoggedIn = true;
          this.isModerator = (this.currentUser.role !== 'USER');
          this.isUserFollowingFeed();
        }

        // console.log(this.currentUser);
        // console.log(this.isLoggedIn);
        // console.log(this.isModerator);
        // console.log(this.isFollowing);
      });
    this.getFeedFollowersCount()
      .then(response => {
        if (response.error == null) {
          console.log(response.length);
          this.feedFollowersCount = response.length;
        }
      });
  }
}
