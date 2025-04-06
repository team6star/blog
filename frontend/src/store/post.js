import { defineStore } from 'pinia';
import { createPost, loadPosts, likePost, favorPost } from '../apis/post';
import { useCommentStore } from './comment';
import { useUIStore } from './index';
import { shallowRef } from 'vue';

export const usePostStore = defineStore('post', {
  state: () => ({
    list: shallowRef([]),
    searchResult: shallowRef([]),
    currentId: null
  }),
  actions: {
    async uploadPost({ image, description }) {
      await createPost(image, description);
      await this.loadAllPosts();
      const uiStore = useUIStore();
      // 关闭对话框并清空上传的图片
      uiStore.changeShowPostUpload(false);
    },
    async loadAllPosts() {
      const posts = await loadPosts();
      this.list = posts;
    },
    async toggleLike(id) {
      const isLike = await likePost(id);
      const post = this.list.find((post) => post.id === id);
      let lastOperationTime = 0;
      if (Date.now() - lastOperationTime < 1000) return; // 1秒节流
      lastOperationTime = Date.now();

      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    async toggleFavor(id) {
      const isFavor = await favorPost(id);
      const post = this.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    async showPostDetails(id) {
      this.currentId = id;
      const commentStore = useCommentStore();//获取comment store实例
      await commentStore.loadAllComments(id);
      const uiStore = useUIStore();
      uiStore.changeShowPostDetails(true);
    },
    async hidePostDetails() {
      this.currentId = null;
      const uiStore = useUIStore();
      uiStore.changeShowPostDetails(false);
    },
    async searchPosts(term) {
      const posts = await loadPosts('filters[description][$contains]=' + term);
      this.searchResult = posts;
    },
  },
  getters: {
    postDetails: (state) => {
      return state.list.find((post) => post.id === state.currentId);
    }
  }
});

