<template>
    <div id="addpost">
        <form class="form" @submit.prevent="createPost">
            <div class="formpostbody">
                <p>Post body</p>
                <textarea
                    id="postbody"
                    v-model="postBody"
                    placeholder="textarea"></textarea>
            </div>

            <button id="createpost" type="submit">Create post</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    name: "addPost",
    data() {
        return {
            postBody: "",
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async createPost() {
            if (!this.postBody.trim()) {
                alert("Post body cannot be empty");
                return;
            }
            try {
                await axios.post("http://localhost:3000/posts", {
                    body: this.postBody,
                });
                this.router.push("/");
            } catch (err) {
                console.error(err);
                alert("Error creating post");
            }
        },
    },
};
</script>

<style scoped>
#addpost {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

#addpost .form {
    margin-top: 5em;
    background-color: #ffffff;
    border-radius: 1rem;
    padding: 10px 20px;
    transition: transform 0.2s;
    width: 25em;
    display: flex;
    flex-direction: column;
    align-items: center;
}
#addpost .form > div {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: start;
    gap: 0.5em;
    margin-bottom: 1em;
}
#addpost .form #postbody {
    width: 24em;
    min-width: 24em;
    max-width: 24em;
    height: 10em;
    min-height: 10em;
}
#addpost #createpost,
#choosefile {
    justify-content: center;
    align-items: center;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1em;
    width: 8em;
    height: 2em;
    display: flex;
    text-decoration: none;
}
#addpost #choosefile {
    background-color: #94a3b8;
}
#addpost #createpost {
    border-radius: 1rem;
    cursor: pointer;
    background-color: #6366f1;
}
#addpost #choosefile:hover {
    background-color: #7e8ba3; /* hover efekt */
}

#addpost #createpost:hover {
    background-color: #4f46e5; /* hover efekt */
}
</style>
