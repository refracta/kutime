<template>
  <v-list two-line subheader>
    <v-subheader>내가 추가한 강의</v-subheader>
    <template v-for="(course, index) in sampleCourses">
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
          <v-btn icon>
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
  data () {
    return {
      sampleCourses: [
        {
          id: 'MTH3103-001',
          name: '복소해석학 1',
          professor: '정해원'
        },
        {
          id: 'MTH3221-001',
          name: '대수학 1',
          professor: '이익권'
        },
        {
          id: 'MTH3301-001',
          name: '위상수학 1',
          professor: '송용진'
        }
      ]
    }
  }
}
</script>
