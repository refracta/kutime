import Vue from 'vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import CalcPage from './components/CalcPage';
import './assets/global-tuning.scss';

const viewModel = new Vue({
	el: '#intime-app',
	components: { CalcPage },
	template: '<CalcPage/>',
});
