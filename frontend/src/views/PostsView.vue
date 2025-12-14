<template>
    <div>
        <div class="logout-wrapper">
            <button class="logout-btn" @click="goToLogin">Logout</button>
        </div>
        <main class="content" v-if="posts.length === 0">Postitusi pole</main>
        <main class="content" v-else>
            <PostComponent
                @click="goToPost(post.id)"
                v-for="post in sortedPosts"
                :key="post.id"
                :post="post"
                class="post">
            </PostComponent>
        </main>
        <div class="actions-wrapper">
            <button class="add-btn" @click="goToAddPost">Add post</button>
            <button class="delete-btn" @click="deleteAllPosts">
                Delete all
            </button>
        </div>
    </div>
</template>

<script>
import { useRouter } from "vue-router";
import PostComponent from "../components/PostComponent.vue";

import axios from "axios";

export default {
    name: "PostsView",
    components: { PostComponent },
    data() {
        return {
            posts: [],
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        goToLogin() {
            // logout
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            this.router.push("/login");
        },
        goToAddPost() {
            this.router.push("/addPost");
        },
        goToPost(id) {
            this.router.push(`/posts/${id}`);
        },
        async deleteAllPosts() {
            if (confirm("Oled kindel, et tahad kõik postitused kustutada?")) {
                try {
                    await axios.delete("http://localhost:3000/posts");
                    this.posts = [];
                } catch (err) {
                    console.error(err);
                    alert("Error deleting posts");
                }
            }
        },
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        },
    },
    async created() {
        try {
            const res = await axios.get("http://localhost:3000/posts");
            this.posts = res.data;
        } catch (err) {
            console.error(err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                this.router.push('/login');
            }
        }
    },
};
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    gap: 2em;
}
.logout-wrapper {
    display: flex;
    justify-content: center;
    padding: 1em 2em;
}

.logout-btn {
    background-color: rgb(97, 97, 250);
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 0.9em;
    cursor: pointer;
    width: 100px;
    height: 3em;
    font-family: "Arial", sans-serif;
}
.logout-btn:hover {
    background-color: rgb(72, 72, 220);
}

.actions-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 2em;
    max-width: 800px;
    margin: 0 auto;
}

.add-btn,
.delete-btn {
    background-color: rgb(97, 97, 250);
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 0.9em;
    cursor: pointer;
    width: 120px;
    height: 3em;
    font-family: "Arial", sans-serif;
}
.add-btn:hover,
.delete-btn:hover {
    background-color: rgb(72, 72, 220);
}
</style>
