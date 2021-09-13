<template>
  <div v-if="!loading" class="post__detail-wrapper">
    <h1>
      {{ currPost.id }}
    </h1>
    <h2>{{ currPost.title }}</h2>
    <p>
      {{ currPost.body }}
    </p>
  </div>
  <div v-else class="loader"></div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "BlogDetail",
  data: function () {
    return {
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
        this.postById(data);
        this.loading = false;
      })
      .catch((error) => {
        console.error(error);
        this.loading = false;
      });
  },
  computed: {
    ...mapState(["currPost"]),
  },
  methods: {
    ...mapMutations(["postById"]),
  },
};
</script>

<style>
</style>