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
					<a class="button"
						:class="[lecture[14].isStarred ? 'is-starred' : 'is-white']"
						:disabled="!canUseStorage"
						@click="[lecture[14].isStarred ? removeLecture(index) : addLecture(index)]">
						<span class="icon is-medium">
							<i class="fa fa-lg" :class="[lecture[14].isStarred ? 'fa-star' : 'fa-star-o']"></i>
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
			<span class="icon is-medium" v-if="hasCandidates">
				<i class="fa fa-star fa-lg"></i>
			</span>
			<span v-if="hasCandidates">또는</span>
			<span class="icon is-medium">
				<i class="fa fa-filter fa-lg"></i>
			</span>
			<span>을 선택하세요.</span>
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { storage } from '../utils/web-storage';

export default {
	name: 'lectureList',
	data () {
		return {};
	},
	computed: {
		canUseStorage () {
			return (storage !== null);
		},
		isGuiding () {
			return (this.activatedCode === '' || this.isLoading);
		},
		hasCandidates () {
			return (this.starredList.length > 0);
		},
		...mapState([
			'activatedCode',
			'isLoading',
			'isReady',
		]),
		...mapState({
			lectureList (state) {
				let originalList = state.lectureList;
				let newList = [];

				for (let idx = 0; idx < originalList.length; idx += 1) {
					let lecture = originalList[idx].slice();

					lecture.push({
						isStarred: (this.starredList.indexOf(lecture[0]) !== -1),
					});
					newList.push(lecture);
				}

				return newList;
			},
		}),
		...mapGetters([
			'starredList',
		])
	},
	methods: {
		openDetail (idx) {
			this.$store.commit('openDetail', idx);
		},
		addLecture (idx) {
			if (this.canUseStorage) {
				this.$store.commit('addLecture', idx);
			}
		},
		removeLecture (idx) {
			if (this.canUseStorage) {
				this.$store.commit('removeLecture', idx);
			}
		}
	}
};
</script>
