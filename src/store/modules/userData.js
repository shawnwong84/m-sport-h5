export const userData = {
    state: {
        categoryList: [],
        advertList: [],
        userInfo: {},
    },
    mutations: {
        setCategoryList: (state, data) => {
            state.categoryList = data;
        },
        setAdvertList: (state, data) => {
            state.advertList = data;
        },
        setUserInfo: (state, data) => {
            state.userInfo = data;
        },
    },
    actions: {
        setUserInfo: ({ commit }, data) => {
            commit('setUserInfo', data);
        },
    },
    getters: {
        getCategoryList: (state) => state.categoryList,
        getAdvertList: (state) => state.advertList,
        getUserInfo: (state) => state.userInfo,
    },
};
