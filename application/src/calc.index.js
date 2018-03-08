import Vue from 'vue';
import CalcPage from './components/CalcPage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

new Vue({
	el: '#intime-app',
	components: { CalcPage },
	template: '<CalcPage/>',
});
