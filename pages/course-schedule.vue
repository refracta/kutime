<template>
  <v-layout wrap>
    <v-flex xs12 sm7 md6>
      <v-select
        v-model="selectedCategoryId"
        :items="majorCategories"
        label="학부(과)/전공"
      ></v-select>
    </v-flex>
    <v-flex xs12 sm4 md3 offset-sm1>
      <v-select
        v-model="selectedCategoryId"
        :items="otherCategories"
        label="기타"
      ></v-select>
    </v-flex>
    <v-flex xs12 md1 offset-md1>
      <v-btn
        block
        color="info"
        :disabled="!selectedCategoryId || isLoadingCourses"
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
    const query = `{
      categories {
        id
        name
        isCollege
      }
    }`
    return axios.post('/graphql', { query })
      .then((res) => {
        const { categories } = res.data.data
        const majorCategories = categories
          .filter((category) => {
            return category.isCollege
          })
          .map((category) => {
            return {
              text: category.name,
              value: category.id
            }
          })
        const otherCategories = categories
          .filter((category) => {
            return !category.isCollege
          })
          .map((category) => {
            return {
              text: category.name,
              value: category.id
            }
          })
        return {
          majorCategories,
          otherCategories
        }
      })
      .catch((e) => {
        error({
          statusCode: 404
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
      selectedCategoryId: '',
      majorCategories: [],
      otherCategories: [],
      isLoadingCourses: false
    }
  },
  methods: {
    getCourses () {
      this.isLoadingCourses = true
      const query = `{
        courses(categoryId: "${this.selectedCategoryId}") {
          id
          classGroup
          name
          grade
          credit
          type
          timePlace
          professor
          evaluation
          note
        }
      }`
      return axios.post('/graphql', { query })
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
