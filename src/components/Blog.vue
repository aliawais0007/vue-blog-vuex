<template>
  <div class="card-wrapper" v-if="filteredPosts && filteredPosts.length">
    <Card v-for="post in filteredPosts" :key="post && post.id" :myPost="post" />
  </div>
  <div v-else class="loader"></div>

  <div class="pagination">
    <span
      v-for="index in totalPages"
      :key="index"
      @click="paginatedPosts(index)"
      >{{ index }}</span
    >
  </div>
</template>

<script async>
import Card from "./Card";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Blog",
  components: {
    Card,
  },
  mounted: function () {
    this.addAsyncPosts();
  },
  computed: {
    ...mapState(["posts", "page", "totalPages", "filteredPosts", "error"]),
  },
  watch: {
    error(newValue) {
      if (Object.keys(newValue).length > 0) {
        alert(newValue.error);
      }
    },
  },
  methods: {
    ...mapMutations(["paginatedPosts"]),
    ...mapActions(["addAsyncPosts"]),
  },
};
</script>

