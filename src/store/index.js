import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as modules from './modules';

Vue.use(Vuex);
let store = new Vuex.Store({
    modules,
    plugins: [createPersistedState()],
});

export default store;
