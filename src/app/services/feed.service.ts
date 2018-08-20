import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  url = 'https://guarded-forest-81137.herokuapp.com/api/';

  constructor() {
  }

  findFeedById(feedId) {
    // console.log(feedId);
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
    // console.log(postIds);
    postIds.forEach(id => {
      this.findPostById(id)
        .then(post => {
          posts.push(post);
        });
    });
    // console.log(posts);
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

  findInternalPostsByName(feedName, postLimit) {
    return fetch(this.url + 'feed/' + feedName + '/internal/' + postLimit, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response);
          // console.log(response.json());
          return response.json();
        } else {
          return {error: 'Failed to find internal posts for feed ' + feedName};
        }
      });
  }

  findExternalPostsByName(feedName, postLimit) {
    return fetch(this.url + 'feed/' + feedName + '/external/' + postLimit, {
      method: 'get',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(response => {
        if (response.status === 200) {
          // console.log(response);
          // console.log(response.json());
          return response.json();
        } else {
          return {error: 'Failed to find external posts for feed ' + feedName};
        }
      });
  }

  
}
