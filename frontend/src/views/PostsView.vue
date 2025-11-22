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
    data() {
        return { posts: [] };
    },
    async created() {
        try {
            const res = await fetch("/posts.json");
            if (!res.ok) throw new Error("Network response was not ok");
            const postsData = await res.json();
            this.posts = postsData
                .slice()
                .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
        } catch (err) {
            console.error("Error loading posts:", err);
        }
    },
    methods: {
        formatDate(iso) {
            return new Date(iso).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        },
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
