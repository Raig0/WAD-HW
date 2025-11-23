<template>
    
    <div class="post">
    <div class="post-header">
        <img
            :src="post.avatar"
            class="user-icon"
            alt=""
            v-if="post.avatar" />
            <time :datetime="post.created_at" class="meta">
                {{new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                })}} by <p class="author">{{ post.author }}</p> </time>
        </div>
            <img class="post-img":src="post.image" alt="Post image" v-if="post.image" />
            <p>{{ post.content }}</p>
        </div>
        
</template>

<script>
export default {
    name: "PostComponent",
    props: {
        post: Object,
    },
};


</script>

<style scoped>
.post {
    background-color: rgb(248, 243, 243);
    border-radius: 1em;
    padding: 1em 2em;
    width: 100%;
    transition: 0.3s ease-in-out;
}

.post-header {
    display: flex;
    gap: 0.5em;
    flex-direction: row;
    width: 100%;
    justify-content: between;
    align-items: center;
}

.post:hover {
    transform: scale(1.02);
    transition: 0.5s ease-in-out;
}

.user-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.author {
    color: #6366f1;
    font-weight: bold;
}

.post-img {
    width: 100%;
    border-radius: 10px;
    margin: 10px 0;
}

@media (max-width: 800px) {
    .post {
        width: 90%;
    }
}

.post + .post {
    margin-top: 1em;
}

.meta{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3rem;
}
</style>
