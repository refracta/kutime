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
    <v-flex class="mt-3">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="keyword"
            append-icon="fas fa-search"
            label="결과 내 검색"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          disable-initial-sort
          :headers="headers"
          :items="courses"
          item-key="id"
          :search="keyword"
          :rows-per-page-items="rowsPerPage"
        >
          <template v-slot:items="props">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.classGroup }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.grade }}</td>
            <td>{{ props.item.credit }}</td>
            <td>{{ props.item.type }}</td>
            <td>{{ props.item.timePlace }}</td>
            <td>{{ props.item.professor }}</td>
            <td>{{ props.item.evaluation }}</td>
            <td>{{ props.item.note }}</td>
          </template>
        </v-data-table>
      </v-card>
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
      headers: [
        { text: '학수번호', value: 'id', width: '140' },
        { text: '분반그룹', value: 'classGroup', width: '140' },
        { text: '과목명', value: 'name', width: '290' },
        { text: '학년', value: 'grade', width: '90' },
        { text: '학점', value: 'credit', width: '90' },
        { text: '과목구분', value: 'type', width: '115' },
        { text: '시간 및 강의실', value: 'timePlace', width: '290' },
        { text: '담당교수', value: 'professor', width: '140' },
        { text: '평가방식', value: 'evaluation', width: '115' },
        { text: '비고', value: 'note', width: '190' }
      ],
      courses: [],
      keyword: '',
      rowsPerPage: [10, 20, 30],
      isLoadingCourses: false
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
          const { courses } = res.data.data
          this.courses = courses
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.keyword = ''
          this.isLoadingCourses = false
        })
    }
  }
}
</script>
