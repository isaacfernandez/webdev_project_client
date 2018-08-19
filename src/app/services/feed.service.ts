import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  url = 'https://guarded-forest-81137.herokuapp.com/api/';

  constructor() {
  }

  findFeedById(feedId) {
    console.log(feedId);
    return fetch(this.url + 'feed/' + feedId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return {error: 'Feed lookup failed.'};
        }
      });
  }

  findPostById(postId) {
    return fetch(this.url + 'post/' + postId, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return {error: 'Post lookup failed.'};
        }
      });
  }

  findPostsByIds(postIds) {
    const posts = [];
    postIds.forEach(id => {
      this.findPostById(id)
        .then(post => {
          posts.push(post);
        });
      ;
    });
    return posts;
  }

  createPostForFeed(feedId, post) {
    return fetch(this.url + 'post/' + feedId, {
      method: 'post',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return {error: 'Post submission failed.'};
        }
      });
  }
}
