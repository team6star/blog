<template>
  <TheModal @close="uiStore.changeShowPostUpload(false)">
    <div class="postUpload">
      <label class="upload">
        <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
        <TheIcon v-else icon="upload-image" />
        <input
          type="file"
          accept="image/*"
          class="fileChooser"
          @change="handleImageUpload"
        />
      </label>
      <div class="postContent">
        <textarea
          placeholder="写点什么吧..."
          class="postContentInput"
          v-model="description"
        ></textarea>
        <TheButton class="pubBtn" @click="publishPost"
          >发布</TheButton
        >
      </div>
    </div>
  </TheModal>
</template>
<script setup>
import TheModal from "./TheModal.vue";
import TheIcon from "./TheIcon.vue";
import TheButton from "./TheButton.vue";
// import { useStore } from "vuex";
import { useUIStore } from '../store';
import { usePostStore } from '../store/post';

import { ref } from "vue";

// const store = useStore();
const uiStore = useUIStore();
const postStore = usePostStore();

const imageObjUrl = ref("");

const image = ref(null);
const description = ref("");

async function handleImageUpload(e) {
  // 暂时只允许上传一张图片
  const imageFile = e.target.files[0];
  if (imageFile) {
    // 设置预览
    imageObjUrl.value = URL.createObjectURL(imageFile);
    // 设置图片文件
    image.value = imageFile;
  }
}
async function publishPost() {
  await postStore.uploadPost({  // 修改为调用 postStore 的 action
    image: image.value,
    description: description.value
  });
  uiStore.changeShowPostUpload(false);  // 关闭模态框
}
</script>
<style scoped>
.postUpload {
  width: 50vw;
  height: 70vh;
  display: grid;
  grid-template-rows: 4fr 1fr;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 0;
}
.upload {
  display: grid;
  place-items: center;
  cursor: pointer;
  min-height: 0;
}
.upload > svg {
  width: 254px;
  height: 316px;
}

.fileChooser {
  opacity: 0;
  position: absolute;
}

.postContent {
  display: grid;
}
.postContentInput {
  border-bottom: none;
  resize: none;
  padding: 12px 24px;
}

.postContentInput::placeholder {
  color: #757575;
}

.pubBtn {
  align-self: end;
  justify-self: end;
  position: relative;
  right: 24px;
  bottom: 18px;
}
</style>
