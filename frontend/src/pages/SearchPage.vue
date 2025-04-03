<template>
  <div>
    <h2 class="title">搜索结果：{{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post" />
    </PostList>
  </div>
</template>
<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { computed,watch } from "vue";
// import { useStore } from "vuex";
import {usePostStore} from "../store/post";
import { useRoute } from "vue-router";

const postStore = usePostStore();
const searchResult = computed(() => postStore.searchResult);

const route = useRoute();
const term = computed(() => route.params.term);
// 添加搜索触发逻辑
watch(term, (newTerm) => {
  postStore.searchPosts(newTerm);
}, { immediate: true });
</script>
<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
