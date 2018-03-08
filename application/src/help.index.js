import Vue from 'vue';
import HelpPage from './components/HelpPage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

new Vue({
	el: '#intime-app',
	components: { HelpPage },
	template: '<HelpPage/>',
});
