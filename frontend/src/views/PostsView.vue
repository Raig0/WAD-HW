<template>
    <main class="content">
        <PostComponent
            v-for="post in posts"
            :key="post.id"
            :post="post"
            class="post"></PostComponent>
    </main>
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
</style>
