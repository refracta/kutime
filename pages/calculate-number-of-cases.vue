<template>
  <v-layout wrap>
    <v-flex xs12 md10>
      <v-container
        fluid
        grid-list-md
        class="pa-0"
      >
        <v-layout wrap>
          <v-flex
            v-for="group in courseGroups"
            :key="group.idPrefix"
            xs12
            sm6
            md4
            lg3
          >
            <v-card
              :flat="group.isExcluded"
              :class="{
                'accent white--text': group.isLocked,
                'grey lighten-2 grey--text text--lighten-1': group.isExcluded
              }"
            >
              <v-card-actions>
                <v-layout wrap>
                  <v-flex xs9 md12>
                    <div class="subheading text-truncate">{{ group.name }}</div>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="group.isLocked"
                        icon
                        small
                        @click="unlockCourseGroup(group.idPrefix)"
                      >
                        <v-icon small>fas fa-unlock</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        small
                        :disabled="group.isExcluded"
                        @click="lockCourseGroup(group)"
                      >
                        <v-icon small>fas fa-lock</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="group.isExcluded"
                        icon
                        small
                        @click="unexcludeCourseGroup(group.idPrefix)"
                      >
                        <v-icon small>fas fa-eye</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        small
                        :disabled="group.isLocked"
                        @click="excludeCourseGroup(group)"
                      >
                        <v-icon small>fas fa-eye-slash</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 md1 offset-md1>
      <v-btn
        block
        color="info"
      >계산</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'calculate-number-of-cases-page',
  layout: 'calculate-number-of-cases',
  head () {
    return {
      title: '경우의 수 계산'
    }
  },
  data () {
    return {
      lockedCourseGroups: [],
      excludedCourseGroups: []
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('checkStorage')
        .then(() => {
          return this.$store.dispatch('setupData')
        })
        .catch((e) => {
          console.warn(e)
        })
    })
  },
  computed: {
    selectedCourses () {
      return this.$store.state.selectedCourses
    },
    courseGroups () {
      const courseIdPrefixes = this.selectedCourses.map((course) => {
        return course.id.match(/^([a-z0-9]+)-[0-9]+$/i)[1]
      })
      const uniqueCourseIdPrefixes = [...(new Set(courseIdPrefixes))]
      return uniqueCourseIdPrefixes.map((prefix) => {
        const course = this.selectedCourses.find((course) => {
          return course.id.startsWith(prefix)
        })
        return {
          idPrefix: prefix,
          name: course.name,
          isLocked: this.lockedCourseGroups.includes(prefix),
          isExcluded: this.excludedCourseGroups.includes(prefix)
        }
      })
    }
  },
  methods: {
    lockCourseGroup (group) {
      if (!group.isExcluded) {
        this.lockedCourseGroups.push(group.idPrefix)
      }
    },
    unlockCourseGroup (prefix) {
      const index = this.lockedCourseGroups.findIndex((lockedPrefix) => {
        return lockedPrefix === prefix
      })
      this.lockedCourseGroups.splice(index, 1)
    },
    excludeCourseGroup (group) {
      if (!group.isLocked) {
        this.excludedCourseGroups.push(group.idPrefix)
      }
    },
    unexcludeCourseGroup (prefix) {
      const index = this.excludedCourseGroups.findIndex((excludedPrefix) => {
        return excludedPrefix === prefix
      })
      this.excludedCourseGroups.splice(index, 1)
    }
  }
}
</script>
