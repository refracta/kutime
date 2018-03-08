import Vue from 'vue';
import IntroPage from './components/IntroPage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

new Vue({
	el: '#intime-app',
	components: { IntroPage },
	template: '<IntroPage/>',
});
