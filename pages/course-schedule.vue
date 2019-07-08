<template>
  <v-layout wrap>
    <v-flex xs12 sm7 md6>
      <v-select
        v-model="selectedId"
        :items="majors"
        label="학부(과)/전공"
      ></v-select>
    </v-flex>
    <v-flex xs12 sm4 md3 offset-sm1>
      <v-select
        v-model="selectedId"
        :items="others"
        label="기타"
      ></v-select>
    </v-flex>
    <v-flex xs12 md1 offset-md1>
      <v-btn
        block
        color="info"
        :disabled="!selectedId || isLoadingCourses"
        :loading="isLoadingCourses"
        @click="getCourses"
      >조회</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'course-schedule-page',
  asyncData ({ params, error }) {
    return axios.get('/api/categories')
      .then((res) => {
        return {
          majors: res.data.departments.map((category) => {
            return {
              text: category.name,
              value: category.code
            }
          }),
          others: res.data.others.map((category) => {
            return {
              text: category.name,
              value: category.code
            }
          })
        }
      })
      .catch((e) => {
        error({
          statusCode: 404,
          message: 'Category not found'
        })
      })
  },
  head () {
    return {
      title: '강의시간표 조회'
    }
  },
  data () {
    return {
      selectedId: '',
      majors: [],
      others: [],
      isLoadingCourses: false
    }
  },
  methods: {
    getCourses () {
      this.isLoadingCourses = true
      return axios.get(`/api/lectures/${this.selectedId}`)
        .then((res) => {
          console.log(res.data)
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.isLoadingCourses = false
        })
    }
  }
}
</script>
