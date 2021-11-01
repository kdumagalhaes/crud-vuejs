import { createStore } from "vuex";

export default createStore({
    state: {
        isModal: false,
    },
    mutations: {
        SHOW_MODAL(state) {
            state.isModal = true
        },
        CLOSE_MODAL(state) {
            state.isModal = false
        },
    },
    actions: {
        showModal({ commit }) {
            commit('SHOW_MODAL')
        },
        closeModal({ commit }) {
            commit('CLOSE_MODAL')
        },
    },
    getters: {
        showModal(state) {
            return state.isModal
        }
    },
});