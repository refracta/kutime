import Vue from 'vue';
import 'bulma/css/bulma.css';
import 'bulma-extensions/bulma-tooltip/dist/bulma-tooltip.min.css';
import 'font-awesome/scss/font-awesome.scss';
import IntroPage from './components/IntroPage';
import './assets/global-tuning.scss';

const viewModel = new Vue({
	el: '#intime-app',
	components: { IntroPage },
	template: '<IntroPage/>',
});
