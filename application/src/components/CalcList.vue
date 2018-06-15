<template>
	<ul>
		<li class="box"
			v-for="(calculated, index) in calculatedList"
			:key="index">
			<article class="media">
				<div class="media-content">
					<div class="media-content">
						<div class="content is-size-7-mobile">
							<p>
								<strong>#{{ 1 + index }}/{{ paginator.count() }}</strong>
								<small>{{ calculated.lectureCodeList.length }}과목 {{ calculated.credit }}학점</small>
								<br>
								<small>{{ calculated.lectureNameList.join(', ') }}</small>
							</p>
						</div>
					</div>
				</div>
				<div class="media-right">
					<a class="button is-white"
						@click="openSchedule(index)">
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
			<span v-if="!hasCandidates">추가된 강의가 없습니다.</span>
			<span class="icon is-medium" v-if="hasCandidates && isLoading === null">
				<i class="fa fa-sliders fa-lg"></i>
			</span>
			<span v-if="hasCandidates && isLoading === null">을 선택하세요.</span>
			<span v-if="hasCandidates && isLoading !== null">경우의 수가 없습니다.</span>
		</li>
		<li class="button is-fullwidth is-info is-outlined" @click="renderNext"
			v-else-if="paginator.hasNext">
			<span>더 보기</span>
		</li>
	</ul>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
	name: 'calcList',
	data() {
		return {};
	},
	computed: {
		isGuiding() {
			return (this.isLoading || this.calculatedList.length === 0);
		},
		...mapState([
			'paginator',
			'isLoading',
			'isReady',
		]),
		...mapState({
			calculatedList(state) {
				const originalList = state.calculatedList;
				const newList = [];

				for (let idx = 0; idx < originalList.length; idx += 1) {
					const lectureCodeList = originalList[idx].slice();
					const temp = {
						credit: 0,
						lectureCodeList,
						lectureNameList: [],
					};

					for (let codeIdx = 0; codeIdx < lectureCodeList.length; codeIdx += 1) {
						const lectureCode = lectureCodeList[codeIdx];

						temp.credit += Number(this.lectureDetails[lectureCode][4]);
						temp.lectureNameList.push(this.lectureDetails[lectureCode][2]);
					}

					newList.push(temp);
				}

				return newList;
			},
		}),
		...mapGetters([
			'lectureDetails',
			'hasCandidates',
		]),
	},
	methods: {
		openSchedule(idx) {
			this.$store.commit('openSchedule', idx);
		},
		renderNext() {
			this.$store.dispatch('renderNext');
		},
	},
};
</script>
