<template>
  <div class="card-wrapper" v-if="!loading">
    <Card
      v-for="post in filteredPosts"
      :key="post && post.id"
      v-bind:myPost="post"
    />
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
import { mapState, mapMutations } from "vuex";

export default {
  name: "Blog",
  data: function () {
    return {
      loading: true,
    };
  },
  components: {
    Card,
  },
  mounted: function () {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "get" })
      .then((response) => this.responseHandler(response))
      .then((myData) => {
        this.addPosts(myData);
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
  computed: {
    ...mapState(["posts", "page", "totalPages", "filteredPosts"]),
  },
  methods: {
    ...mapMutations(["addPosts", "paginatedPosts"]),
    responseHandler: async function (response) {
      if (response.status === 200) {
        return await response.json();
      } else throw await response.json();
    },
  },
};
</script>

