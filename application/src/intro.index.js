import Vue from 'vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import IntroPage from './components/IntroPage';
import './assets/global-tuning.scss';

new Vue({
	el: '#intime-app',
	components: { IntroPage },
	template: '<IntroPage/>',
});
