<template>
    <div>
        <div class="logout-wrapper">
            <button class="logout-btn" @click="goToLogin">
                Logout
            </button>
        </div>
        <main class="content">
            <PostComponent
                v-for="post in posts"
                :key="post.id"
                :post="post"
                class="post">
            </PostComponent>
        </main>
        <div class="actions-wrapper">
            <button class="add-btn" @click="goToAddPost">
                Add post
            </button>
            <button class="delete-btn">Delete all</button>
        </div>
    </div>
</template>

<script>
import PostComponent from "../components/PostComponent.vue";

export default {
    name: "PostsView",
    components: { PostComponent },
    computed: {
        posts() {
            return this.$store.state.posts;
        },
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
        goToAddPost() {
            this.$router.push('/addPost');
        }
    },
    async created() {
        await this.$store.dispatch("fetchPosts");
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

.logout-btn{
    background-color: rgb(97, 97, 250);
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 0.9em;
    cursor: pointer;
    width: 100px;
    height: 3em;
    font-family: 'Arial', sans-serif;
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

.add-btn, .delete-btn {
    background-color: rgb(97, 97, 250);
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 0.9em;
    cursor: pointer;
    width: 120px;
    height: 3em;
    font-family: 'Arial', sans-serif;
}
.add-btn:hover, .delete-btn:hover {
    background-color: rgb(72, 72, 220);
}
</style>
