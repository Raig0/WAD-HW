import { createStore } from "vuex";
import postsData from "../posts.json";

export default createStore({
  // algseis: loeme posts.json-ist ja lisame likes välja
  state() {
    return {
      posts: postsData.map((p) => ({
        ...p,
        likes: p.likes ?? 0, // kui likes puudub, siis 0
      })),
    };
  },

  mutations: {
    
    setPosts(state, posts) {
      state.posts = posts.map((p) => ({
        ...p,
        likes: p.likes ?? 0,
      }));
    },

    incrementLike(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes++;
      }
    },

    resetAllLikes(state) {
      state.posts.forEach((p) => {
        p.likes = 0;
      });
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      const res = await fetch("/posts.json");
      const posts = await res.json();

      const sorted = posts
        .slice()
        .sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

      commit("setPosts", sorted);
    },
  },

  getters: {
    getPosts(state) {
      return state.posts;
    },

    posts(state) {
      return state.posts;
    },
  },
});
