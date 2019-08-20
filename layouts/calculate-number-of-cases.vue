<template>
  <v-app>
    <GlobalNavigation />
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="toggleNavigation" />
      <v-toolbar-title>경우의 수 계산</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="toggleRightDrawer"
      >
        <v-icon>fas fa-question-circle</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="isActiveRightDrawer"
      right
      temporary
      fixed
    >
      <v-subheader>페이지 안내</v-subheader>
      <v-card flat>
        <v-card-title>
          <div>
            <span>추가된 강의를 조합하여, 겹치는 시간이 없는 시간표를 만들 수 있습니다.</span>
          </div>
        </v-card-title>
      </v-card>
      <v-card flat>
        <v-card-title>
          <div>
            <span><v-icon small>fas fa-lock</v-icon> 아이콘을 클릭하면, 해당 과목은 시간표 조합 결과에 반드시 포함됩니다.</span>
          </div>
        </v-card-title>
      </v-card>
      <v-card flat>
        <v-card-title>
          <div>
            <span><v-icon small>fas fa-eye-slash</v-icon> 아이콘을 클릭하면, 해당 과목은 시간표 조합 결과에서 반드시 제외됩니다.</span>
          </div>
        </v-card-title>
      </v-card>
      <v-card flat>
        <v-card-title>
          <div>
            <span>시간표 조합 결과 중 하나를 저장하면, <nuxt-link to="/">내 시간표 페이지</nuxt-link>에서 바로 볼 수 있습니다.</span>
          </div>
        </v-card-title>
      </v-card>
    </v-navigation-drawer>
    <GlobalFooter />
  </v-app>
</template>

<script>
import GlobalNavigation from '~/components/GlobalNavigation.vue'
import GlobalFooter from '~/components/GlobalFooter.vue'

export default {
  name: 'course-schedule-layout',
  components: {
    GlobalNavigation,
    GlobalFooter
  },
  data () {
    return {
      isActiveRightDrawer: false
    }
  },
  mounted () {
    this.$store.commit('setLeftDrawer', this.$vuetify.breakpoint.lgAndUp)
    this.isActiveRightDrawer = false
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('toggleLeftDrawer')
    },
    toggleRightDrawer () {
      this.isActiveRightDrawer = !this.isActiveRightDrawer
    }
  }
}
</script>
