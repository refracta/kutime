<template>
  <v-list two-line subheader>
    <v-subheader>내가 추가한 강의</v-subheader>
    <template v-for="(course, index) in selectedCourses">
      <v-divider
        v-if="index > 0"
        :key="index"
      ></v-divider>
      <v-list-tile
        :key="course.id"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ course.id }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span class='text--primary'>{{ course.name }}</span> &mdash; {{ course.professor }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn
            icon
            @click="removeSelectedCourse(course.id)"
          >
            <v-icon>fas fa-trash-alt</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'selected-course-list',
  computed: {
    selectedCourses () {
      return this.$store.state.selectedCourses
    }
  },
  methods: {
    removeSelectedCourse (courseId) {
      this.$store.commit('removeSelectedCourse', courseId)
    }
  }
}
</script>
