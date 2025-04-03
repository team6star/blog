

import { defineStore } from 'pinia';
/* import { useUserStore } from './user';
import { usePostStore } from './post';
import { useCommentStore } from './comment'; */

export const useUIStore = defineStore('ui', {
  state: () => ({
    showPostUpload: false,
    showPostDetails: false
  }),
  actions: {
    changeShowPostUpload(show) {
      this.showPostUpload = show;
    },
    changeShowPostDetails(show) {
      this.showPostDetails = show;
    }
  }
});

// export {  useUserStore, usePostStore, useCommentStore };

// 其他模块需要通过各自的 store 文件导出