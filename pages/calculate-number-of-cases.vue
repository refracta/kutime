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
            <v-card>
              <v-card-actions>
                <v-layout wrap>
                  <v-flex xs9 md12>
                    <div class="subheading text-truncate">{{ group.name }}</div>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-spacer></v-spacer>
                      <v-btn icon small>
                        <v-icon small>fas fa-lock</v-icon>
                      </v-btn>
                      <v-btn icon small>
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
          name: course.name
        }
      })
    }
  }
}
</script>
