<template>
    <div class="postPage">
        <div v-if="post" class="post">
            <div class="post-meta">
                <time class="date">
                    {{
                        new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }}
                </time>
            </div>
            <textarea name="" id="" v-model="post.body"> </textarea>
        </div>
        <div class="nupud">
            <button id="update" @click="updatePost">Update</button>
            <button id="delete" @click="deletePost">Delete</button>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "PostPage",
    data() {
        return {
            post: null,
        };
    },
    methods: {
        async updatePost() {
            const postId = this.$route.params.id;
            try {
                await axios.put(`http://localhost:3000/posts/${postId}`, this.post);
            } catch (err) {
                console.error(err);
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    this.$router.push('/login');
                }
            }
        },
        async deletePost() {
            const postId = this.$route.params.id;
            try {
                await axios.delete(`http://localhost:3000/posts/${postId}`);
                this.$router.push("/");
            } catch (err) {
                console.error(err);
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    this.$router.push('/login');
                }
            }
        },
    },
    async created() {
        const postId = this.$route.params.id;
        try {
            const res = await axios.get(`http://localhost:3000/posts/${postId}`);
            this.post = res.data;
        } catch (err) {
            console.error(err);
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                this.$router.push('/login');
            }
        }
    },
};
</script>

<style scoped>
.postPage {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 1rem;
}

.post-meta {
    font-size: 0.9rem;
    color: gray;
}
.post-body {
    font-size: 1.2rem;
    line-height: 1.6;
    white-space: pre-wrap;
}
textarea {
    width: 100%;
    height: 200px;
    font-size: 1.2rem;
    line-height: 1.6;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    resize: vertical;
}
button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
}
.nupud {
    display: flex;
    gap: 1rem;
    flex-direction: row;
}
#update {
    background-color: rgb(97, 97, 250);
    color: white;
}
#delete {
    background-color: #f44336;
    color: white;
}
</style>
