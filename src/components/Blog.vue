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
    <span v-for="index in totalPages" :key="index" @click="pagination(index)">{{
      index
    }}</span>
  </div>
</template>

<script async>
import Card from "./Card";

export default {
  name: "Blog",
  data: function () {
    return {
      posts: [],
      filteredPosts: [],
      totalPages: 0,
      page: 1,
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
        this.posts = myData;
        this.filteredPosts = myData.slice(0, 10);
        this.loading = false;
        this.totalPages = myData.length / 10;
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  },
  methods: {
    responseHandler: async function (response) {
      if (response.status === 200) {
        return await response.json();
      } else throw await response.json();
    },
    pagination: function (page) {
      let endIndex = page * 10;
      let startIndex = endIndex - 10;
      this.filteredPosts = this.posts.slice(startIndex, endIndex);
    },
  },
};
</script>

