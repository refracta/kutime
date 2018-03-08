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
								<strong
									:class="[lecture[customIndex].isExist ? '' : 'has-text-danger']">
									{{ lecture[customIndex].isExist ? lecture[2] : '시간표 정보가 없습니다'}}
								</strong>
								<small
									:class="[lecture[customIndex].isExist ? '' : 'has-text-danger']">
									{{ lecture[0] }}
								</small>
								<br>
								<small>{{ lecture[6] }}</small>
							</p>
						</div>
					</div>
				</div>
				<div class="media-right">
					<a class="button"
						:class="[lecture[customIndex].isStarred ? 'is-starred' : 'is-white']"
						:disabled="!canUseStorage"
						@click="[lecture[customIndex].isStarred ? removeCandidate(lecture[0]) : addCandidate(lecture[0])]"
						v-if="usesFilter">
						<span class="icon is-medium">
							<i class="fa fa-lg" :class="[lecture[customIndex].isStarred ? 'fa-star' : 'fa-star-o']"></i>
						</span>
					</a>
					<a class="button is-white"
						@click="openDetail(index)"
						v-if="lecture[customIndex].isExist">
						<span class="icon is-medium">
							<i class="fa fa-ellipsis-h fa-lg"></i>
						</span>
					</a>
					<a class="button is-white"
						@click="removeWatching(lecture[0])"
						v-if="usesCandidates">
						<span class="icon is-medium">
							<i class="fa fa-remove fa-lg"></i>
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
import { CUSTOM_COLUMN_INDEX as customIndex } from '../utils/pre-defined';
import { storage } from '../utils/web-storage';

export default {
	name: 'lectureList',
	data () {
		return {
			customIndex,
		};
	},
	computed: {
		canUseStorage () {
			return (storage !== null);
		},
		isGuiding () {
			return (this.activatedCode === '' || this.isLoading || this.lectureList.length === 0);
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

					lecture[customIndex] = {
						isExist: (lecture[2] !== null),
						isStarred: (this.starredList.indexOf(lecture[0]) !== -1),
					};
					newList.push(lecture);
				}

				return newList;
			},
		}),
		...mapGetters([
			'starredList',
			'hasCandidates',
			'usesCandidates',
			'usesFilter',
		]),
	},
	methods: {
		openDetail (idx) {
			this.$store.commit('openDetail', idx);
		},
		addCandidate (code) {
			if (this.canUseStorage) {
				this.$store.commit('addCandidate', code);
			}
		},
		removeCandidate (code) {
			if (this.canUseStorage) {
				this.$store.commit('removeCandidate', code);
			}
		},
		removeWatching (code) {
			if (this.canUseStorage) {
				this.$store.commit('removeCandidate', code);
				this.$store.commit('removeWatchingCandidate', code);
			}
		},
	},
};
</script>
