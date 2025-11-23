import { createStore } from "vuex";

export default createStore({
    state: {
        posts: [],
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
    },
    actions: {
        async fetchPosts({ commit }) {
            const res = await fetch("/posts.json");
            const posts = await res.json();
            commit(
                "setPosts",
                posts
                    .slice()
                    .sort(
                        (a, b) =>
                            new Date(b.created_at) - new Date(a.created_at)
                    )
            );
        },
    },
    getters: {
        posts: state => state.posts,
    },
});
