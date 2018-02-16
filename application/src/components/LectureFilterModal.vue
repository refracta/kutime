<template>
	<div class="modal"
		:class="[isActive ? 'is-active' : '']">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">범주 선택</p>
				<button class="delete" aria-label="close" @click="revertCategory"></button>
			</header>
			<section class="modal-card-body">
				<div class="field">
					<div class="control">
						<div class="select is-fullwidth">
							<select @input="chooseCategory">
								<option value="">학부(과) / 전공</option>
								<option v-for="(dept, index) in departmentList"
									:value="dept.code"
									:selected="dept.code === temporaryCode"
									:key="index">{{ dept.name }}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<div class="select is-fullwidth">
							<select @input="chooseCategory">
								<option value="">기타</option>
								<option v-for="(other, index) in otherList"
									:value="other.code"
									:selected="other.code === temporaryCode"
									:key="index">{{ other.name }}</option>
							</select>
						</div>
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button class="button is-primary" :disabled="temporaryCode === ''" @click="commitCategory">적용</button>
				<button class="button" @click="revertCategory">닫기</button>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'lectureFilterModal',
	data () {
		return {
			temporaryCode: ''
		};
	},
	computed: {
		...mapState([
			'departmentList',
			'otherList',
			'activatedCode',
		]),
		...mapState({
			isActive: state => state.isFiltering,
		})
	},
	methods: {
		chooseCategory (e) {
			this.temporaryCode = e.target.value;
		},
		revertCategory () {
			this.temporaryCode = this.activatedCode;
			this.$store.commit('closeFilter');
		},
		commitCategory () {
			this.$store.commit('applyFilter', this.temporaryCode);
			this.$store.commit('closeFilter');
		}
	}
};
</script>
