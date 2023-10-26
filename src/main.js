import '@/assets/scss/index.scss';
import App from './App.vue';
import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
	render(cb) {
		return cb(App);
	},
}).$mount('#app');
