import api from "@/services/api";

const state = {
  users: [],
};


const getters = {
  allUsers: (state) => state.users,
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const { data } = await api.get("/user");
      commit("setUsers", data.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  },
  async deleteUser({ commit, state }, userId) {
    try {
      await api.delete(`/user/${userId}`);
      const updatedUsers = state.users.filter((user) => user.id !== userId);
      commit("setUsers", updatedUsers);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};