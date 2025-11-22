<template>
    <div>
        <div class="post">
            <h2>{{ post.author }}</h2>
            <img
                :src="post.avatar"
                class="post-avatar"
                alt=""
                v-if="post.avatar" />
            <p>{{ post.content }}</p>
            <p>{{ post.created_at }}</p>
            <img :src="post.image" alt="Post image" v-if="post.image" />
        </div>
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

<style>
.post {
    background: #ff0000;
    padding: 2rem;
}
.post-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
