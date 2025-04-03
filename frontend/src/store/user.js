import { defineStore } from 'pinia';
import { changeUser } from "../apis/user";
import { getUser, login, logout, register } from "../apis/auth";

export const useUserStore = defineStore('user', {
  state: () => ({
    user: getUser() || {}
  }),
  actions: {
    async registerUser({ email, username, password }) {
      const user = await register(email, username, password);
      this.user = user;
    },
    async loginUser({ email, password }) {
      const user = await login(email, password);
      this.user = user;
    },
    async updateUser(userData) {
      const updatedUser = await changeUser(userData);
      this.user = updatedUser;
    },
    async logoutUser() {
      logout();
      this.user = {};
    }
  }
});