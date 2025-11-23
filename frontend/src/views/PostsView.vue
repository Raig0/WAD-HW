<template>
  <main class="content">
    <button class="reset-btn" @click="resetAllLikes">
      Reset all likes
    </button>

    <PostComponent
      v-for="post in orderedPosts"
      :key="post.id"
      :post="post"
      class="post"
    />
  </main>
</template>

<script>
import PostComponent from "../components/PostComponent.vue";

export default {
  name: "PostsView",
  components: { PostComponent },

  async created() {
    if (!this.$store.state.posts.length) {
      await this.$store.dispatch("fetchPosts");
    }
  },

  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },

    orderedPosts() {
      return [...this.posts].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    },
  },

  methods: {
    resetAllLikes() {
      this.$store.commit("resetAllLikes");
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

.reset-btn {
  align-self: flex-end;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
}
</style>