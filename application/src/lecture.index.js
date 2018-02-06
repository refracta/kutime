import Vue from 'vue';
import LecturePage from './components/LecturePage.vue';
import 'bulma/css/bulma.css';
import 'font-awesome/scss/font-awesome.scss';
import './assets/global-tuning.scss';

new Vue({
	el: '#intime-app',
	components: { LecturePage },
	template: '<LecturePage/>'
});
