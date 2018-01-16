<?php /* These templates are markup for Vue component. */ ?>
	<template id="template-appnav-button">
		<a class="button is-fullwidth is-inverted"
			:class="[anchor.active ? 'is-primary' : 'is-link']"
			:href="anchor.href"
			:disabled="anchor.disable">
			<span class="icon is-medium">
				<i class="fa fa-lg" :class="anchor.icon"></i>
			</span>
		</a>
	</template>
	<template id="template-appnav-column">
		<div class="column has-text-centered">
			<appnav-button :anchor="anchor"></appnav-button>
		</div>
	</template>
	<template id="template-appnav">
		<nav class="navbar is-fixed-bottom box is-paddingless is-radiusless" role="navigation">
			<div class="container">
				<div class="level is-mobile">
					<div class="level-item is-marginless columns is-mobile is-gapless">
						<appnav-column
							v-for="(anchor, index) in anchors"
							:key="index"
							:anchor="anchor">
						</appnav-column>
					</div>
				</div>
			</div>
		</nav>
	</template>
	<template id="template-lecture-list">
		<ul>
			<li class="box"
				v-for="(lect, index) in lectures"
				:key="index">
				<article class="media">
					<div class="media-content">
						<div class="media-content">
							<div class="content is-size-7-mobile">
								<p>
									<strong>{{ lect[2] }}</strong> <small>{{ lect[0] }}</small>
									<br>
									<small>{{ lect[6] }}</small>
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
						<a class="button is-white">
							<span class="icon is-medium">
								<i class="fa fa-ellipsis-h fa-lg"></i>
							</span>
						</a>
					</div>
				</article>
			</li>
			<li class="button is-fullwidth is-white is-static"
				:class="[activated === '' ? '' : 'is-loading']"
				v-if="activated === '' || state.isLoading">
				<span class="icon is-medium"><i class="fa fa-filter fa-lg"></i></span><span>을 눌러서 범주를 선택하세요.</span>
			</li>
		</ul>
	</template>
	<template id="template-lecture-filter">
		<div class="modal"
			:class="[state.isFiltering ? 'is-active' : '']">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">범주 선택</p>
					<button class="delete" aria-label="close" @click="closeFilter"></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<div class="control">
							<div class="select is-fullwidth">
								<select @input="chooseCategory">
									<option value="">학부(과) / 전공</option>
									<option v-for="(dept, index) in depts"
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
									<option v-for="(other, index) in others"
										:value="other.code"
										:selected="other.code === temporaryCode"
										:key="index">{{ other.name }}</option>
								</select>
							</div>
						</div>
					</div>
				</section>
				<footer class="modal-card-foot">
					<button class="button is-success" :disabled="temporaryCode === ''" @click="applyFilter">적용</button>
					<button class="button" @click="closeFilter">닫기</button>
				</footer>
			</div>
		</div>
	</template>
<?php /* These templates positioned before footer. */ ?>
