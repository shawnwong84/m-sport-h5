export const userData = {
    state: {
        categoryList: [],
        advertList: [],
    },
    mutations: {
        setCategoryList: (state, data) => {
            state.categoryList = data;
        },
        setAdvertList: (state, data) => {
            state.advertList = data;
        },
    },
    getters: {
        getCategoryList: (state) => state.categoryList,
        getAdvertList: (state) => state.advertList,
    },
};
