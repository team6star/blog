<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id" />
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>
<script setup>
import PostList from '../components/PostList.vue';
import PostItem from '../components/PostItem.vue';
import PostUpload from '../components/PostUpload.vue';
import PostDetails from '../components/PostDetails.vue';
// import { useStore } from 'vuex';
import {useUIStore} from '../store'
import {usePostStore} from '../store/post'
import { computed, onMounted } from 'vue';

const uiStore=useUIStore()
const postStore = usePostStore();

const showPostUpload = computed(() => uiStore.showPostUpload);
const showPostDetails = computed(() => uiStore.showPostDetails);
const posts = computed(() => postStore.list);

onMounted(() => {
  postStore.loadAllPosts();
});
</script>
<style scoped></style>
