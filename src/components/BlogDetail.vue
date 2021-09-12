<template>
  <div v-if="!loading" class="post__detail-wrapper">
    <h1>
      {{ post.id }}
    </h1>
    <h2>{{ post.title }}</h2>
    <p>
      {{ post.body }}
    </p>
  </div>
  <div v-else class="loader"></div>
</template>

<script>
export default {
  name: "BlogDetail",
  data: function () {
    return {
      post: {},
      loading: true,
    };
  },
  mounted: function () {
    const postId = this.$route.params.id;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        if (response.ok) return response.json();
        else throw response.json();
      })
      .then((data) => {
        this.post = data;
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  },
};
</script>

<style>
</style>