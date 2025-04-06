<template>
  <div class="search-container">
    <div class="search-bar">
      <h2 class="title">搜索结果：{{ term }}</h2>
    <ul class="search-list">
      <li v-for="post in searchResult" :key="post.id" class="list-item">
        <span v-html="highlightKeywords(post.description, searchRes)"></span>
      </li>
    </ul>
    
    <PostList>
      <PostItem v-for="post in searchResult" class="search-result-item" :post="post" />
    </PostList>
  </div>
  </div>
 
</template>
<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { computed,watch,ref } from "vue";
// import { useStore } from "vuex";
import {usePostStore} from "../store/post";

import { useRoute } from "vue-router";


const postStore = usePostStore();
let searchResult = computed(() => postStore.searchResult);

const searchRes = ref('');



const highlightKeywords = (text, keyword) => {
  if (!keyword) return text;
  // const regex = new RegExp(keyword, 'gi');
  return text.replaceAll(keyword, `<span class="highlight">${keyword}</span>`);
};

const route = useRoute();
const term = computed(() => route.params.term);
// 添加搜索触发逻辑
watch(term, (newTerm) => {
  postStore.searchPosts(newTerm);
}, { immediate: true });
</script>
<style scoped>
.search-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.search-bar {
  display: flex;
  flex-direction: column;  /* 改为垂直排列 */
  gap: 1rem;
  margin-bottom: 2rem;
}

/* 新增列表样式 */
.search-list {
  margin: 1.5rem 0;
  padding: 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.list-item {
  padding: 1rem;
  transition: background 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item:hover {
  background-color: #f8fafc;
}
.search-input {
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #4f46e5;
}



.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

/* 新增高亮样式 */
.highlight {
  background-color: #fef08a;  /* 更柔和的黄色 */
  padding: 0.2em 0.4em;
  border-radius: 4px;
}

/* 搜索结果项样式 */
.search-result-item {
  transition: transform 0.2s ease;
}

.search-result-item:hover {
  transform: translateX(5px);
}
</style>


 