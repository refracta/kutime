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
								<strong>#{{ 1 + index }}/{{ calculatedList.length }}</strong>
								<small>{{ calculated.lectureCodeList.length }}과목 {{ calculated.credit }}학점</small>
								<br>
								<small>{{ calculated.lectureNameList.join(', ') }}</small>
							</p>
						</div>
					</div>
				</div>
				<div class="media-right">
					<a class="button is-white">
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
			<span class="icon is-medium" v-if="hasCandidates">
				<i class="fa fa-sliders fa-lg"></i>
			</span>
			<span v-if="hasCandidates">을 선택하세요.</span>
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
			'isLoading',
			'isReady',
		]),
		...mapState({
			lectureDetails(state) {
				const originalList = state.lectureList;
				const detailSet = {};

				for (let idx = 0; idx < originalList.length; idx += 1) {
					const lecture = originalList[idx].slice();

					detailSet[lecture[0]] = lecture;
				}

				return detailSet;
			},
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
			'hasCandidates',
		]),
	},
	methods: {
	},
};
</script>
