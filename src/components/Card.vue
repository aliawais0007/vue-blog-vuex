<template>
  <div class="blog-card" @click="handlePostClick(myPost.id)">
    <div class="card-content">
      <img src="" />
      <h1>{{myPost.id}}</h1>
      <h2>{{ myPost ? myPost.title : "ALi" }}</h2>
    </div>
  </div>
</template>
<script>
import router from "../router/index";
export default {
  name: "Card",
  props: {
    myPost: Object,
  },
  methods: {
    handlePostClick: function (id) {
      router.push({ path: `/blog/${id}` });
    },
  },
};
</script>


