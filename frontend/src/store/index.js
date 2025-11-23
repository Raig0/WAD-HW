import { createStore } from "vuex";
import postsData from "../posts.json";

export default createStore({
  state() {
    return {
      posts: postsData.map(p => ({
        ...p,
        likes: 0
      }))
    };
  },

  getters: {
    getPosts(state) {
      return state.posts;
    }
  },

  mutations: {
    incrementLike(state, postId) {
      const post = state.posts.find(p => p.id === postId);
      if (post) {
        post.likes++;
      }
    },

    resetAllLikes(state) {
      state.posts.forEach(p => {
        p.likes = 0;
      });
    }
  }
});
