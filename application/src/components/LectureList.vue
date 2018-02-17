<template>
	<ul>
		<li class="box"
			v-for="(lecture, index) in lectureList"
			:key="index">
			<article class="media">
				<div class="media-content">
					<div class="media-content">
						<div class="content is-size-7-mobile">
							<p>
								<strong>{{ lecture[2] }}</strong> <small>{{ lecture[0] }}</small>
								<br>
								<small>{{ lecture[6] }}</small>
							</p>
						</div>
					</div>
				</div>
				<div class="media-right">
					<a class="button is-white">
						<span class="icon is-medium">
							<i class="fa fa-star-o fa-lg"></i>
						</span>
					</a>
					<a class="button is-white" @click="openDetail(index)">
						<span class="icon is-medium">
							<i class="fa fa-ellipsis-h fa-lg"></i>
						</span>
					</a>
				</div>
			</article>
		</li>
		<li class="button is-fullwidth is-white is-static is-placeholder"
			:class="[(isLoading || !isReady) ? 'is-loading' : '']"
			v-if="isGuiding">
			<span class="icon is-medium"><i class="fa fa-filter fa-lg"></i></span><span>을 눌러서 범주를 선택하세요.</span>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'lectureList',
	data () {
		return {};
	},
	computed: {
		isGuiding () {
			return (this.activatedCode === '' || this.isLoading);
		},
		...mapState([
			'lectureList',
			'activatedCode',
			'isLoading',
			'isReady',
		])
	},
	methods: {
		openDetail (idx) {
			this.$store.commit('openDetail', idx);
		}
	}
};
</script>
