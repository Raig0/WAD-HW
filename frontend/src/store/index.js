import { createStore } from "vuex";

export default createStore({
    state: {
        posts: [],
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },

        incrementLikes(state, postId) {
            const post = state.posts.find(p => p.id === postId);
            if (post) {
                post.likes++;
            }
        },
    },

    actions: {
        async fetchPosts({ commit }) {
            const res = await fetch("/posts.json");
            const posts = await res.json();

            const postsWithLikes = posts.map(post => ({
                ...post,
                likes: post.likes ?? 0
            }));

            commit(
                "setPosts",
                postsWithLikes
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
