/*
 * @version:  ;
 * @description:  ;
 * @autor: Full
 * @date: Do not edit
 */
export const downData = {
    state: {
        downAddress: {},
    },
    mutations: {
        setDownAddress: (state, data) => {
            state.downAddress = data;
        },
    },
    actions: {
        setDownAddress: ({ commit }, data) => {
            commit('setDownAddress', data);
        },
    },
    getters: {
        getDownAddress: (state) => state.downAddress,
    },
};
