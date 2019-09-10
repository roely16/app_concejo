import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,
		loggingIn: false,
		loginError: null
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
		loginStop: (state, errorMessage) => {
			state.loggingIn = false;
			state.loginError = errorMessage;
		},
		updateAccessToken: (state, accessToken) => {
			state.accessToken = accessToken;
		},
		logout: (state) => {
			state.accessToken = null;
		}
  },
  actions: {
    doLogin({ commit }, loginData) {

			commit('loginStart')
			
			axios({
				method: 'POST',
				url: 'https://udicat.muniguate.com/apps/api_ave_personalizado/public/login',
				data: loginData
			})
			.then(response => {

				if (response.data.code != 200) {
					
					console.log(response.data)
					commit('loginStop', (null, response.data.message));

				}else{

					localStorage.setItem('accessToken', 125);
					commit('loginStop', null);
					commit('updateAccessToken', 125);
					router.push('/home');

				}
			})
			.catch(error => {
				console.log(error)
				commit('loginStop', error.response.data.error);
				commit('updateAccessToken', null);
			})
			
		},
		fetchAccessToken({ commit }) {
			commit('updateAccessToken', localStorage.getItem('accessToken'));
		},
		logout({ commit }) {
			localStorage.removeItem('accessToken');
			commit('logout');
			router.push('/');
		}
  }
})
