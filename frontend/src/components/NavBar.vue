<template>
  <nav class="navbar">
    <router-link to="/"><img src="../assets/logo.svg" /></router-link>
    <div class="searchInput">
      <!-- <input type="text" @change="searchPosts" /> -->
        <!-- 添加占位符 -->
      <input type="text" v-model="searchTerm" @input="handleSearch" placeholder="搜索文章" />
      <!-- 添加清除按钮 -->
      <button v-if="searchTerm" @click="clearSearch" class="clearBtn">
        <TheIcon icon="close" />
      </button>
      <TheIcon icon="search" />
    </div>
    <div class="navItems">
      <router-link to="/"><TheIcon icon="home" /></router-link>
      <button @click="publishPost()">
        <TheIcon icon="publish" />
      </button>
      <!-- dropdown -->
      <div class="profileDropDown">
        <TheAvatar
          :width="42"
          :height="42"
          style="cursor: pointer"
          @click="showDropdown = !showDropdown"
          :src="user.avatar"
        />
        <div
          class="dropdownMenu"
          v-show="showDropdown"
          @click="showDropdown = false"
        >
          <ul class="profileMenu">
            <li><router-link to="/profile">个人主页</router-link></li>
            <li @click="logout">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import TheIcon from "./TheIcon.vue";
import TheAvatar from "./TheAvatar.vue";
import { useUIStore } from '../store';
import { usePostStore } from '../store/post';
import { useUserStore } from '../store/user';
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import {debounce} from 'lodash-es';

const showDropdown = ref(false);
const uiStore = useUIStore();
const postStore = usePostStore();
const userStore = useUserStore();
const router = useRouter();
const searchTerm = ref("");

const user = computed(() => userStore.user);

function publishPost() {
  uiStore.changeShowPostUpload( true);
}

/* async function searchPosts(e) {
  await postStore.searchPosts( e.target.value);
  router.push({
    name: "search_result",
    params: {
      term: e.target.value,
    },
  });
} */


//  添加防抖函数
const debouncedSearch = debounce(async (term) => {
  await postStore.searchPosts(term);
  if (term) {
    router.push({
      name: "search_result",
      params: { term: term },
    });
  } else {
    router.push('/');
  }
}, 300);
// 实时搜索
async function handleSearch() {
  debouncedSearch(searchTerm.value);
}

// 清除搜索内容
function clearSearch() {
  searchTerm.value = '';
  postStore.searchResult = [];
  router.push('/');
}


async function logout() {
  await userStore.logoutUser();
  router.push("/login");
}
</script>
<style scoped>
.navbar {
  width: 80vw;
  height: 80px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
}
.navbar svg {
  width: 38px;
  height: 38px;
}

.searchInput {
  position: relative;
}

.searchInput input {
  width: 100%;
  padding: 12px;
  padding-left: 36px;
  padding-right: 36px; /* 为清除按钮留出空间 */
  background: #f1f1f1;
  border-radius: 14px;
  border: none;
}

.searchInput > svg {
  position: absolute;
  left: 0;
  top: 11px;
  left: 12px;
}
/* 清除按钮样式 */
.clearBtn {
  position: absolute;
  right: 12px;
  top: 50%;            /* 改为基于父容器垂直居中 */
  transform: translateY(-50%); /* 精确居中定位 */
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
  opacity: 0.7;
}


.navItems {
  justify-self: end;
  display: flex;
  gap: 24px;
  align-items: center;
}

.navItems > button {
  border: none;
  background: none;
}

.profileDropDown {
  position: relative;
}

.profileMenu {
  position: absolute;
  width: max-content;
  padding: 24px 26px;
  list-style: none;
  background: white;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  right: 0;
  display: grid;
  row-gap: 18px;
  transform: translateY(18px);
}

.profileMenu::before {
  content: "";
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  top: -12px;
  right: 10px;
  border-bottom: 12px solid white;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
}

.profileMenu a,
.profileMenu li {
  text-decoration: none;
  cursor: pointer;
}

.profileMenu a:visited {
  color: initial;
}
</style>
