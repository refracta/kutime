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
            ref="searchField"
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
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.professor }}</td>
            <td>{{ props.item.grade }}</td>
            <td>{{ props.item.credit }}</td>
            <td>{{ props.item.type1 }}</td>
            <td>{{ props.item.type2 }}</td>
            <td>{{ props.item.targetDepartment }}</td>
            <td>{{ props.item.target}}</td>
            <td>{{ props.item.time }}</td>
            <td>{{ props.item.place }}</td>
            <td>{{ props.item.creditDetail }}</td>
            <td>{{ props.item.limit }}</td>
            <td class="px-1">
              <v-btn
                v-if="selectedCourseIds.includes(props.item.id)"
                small
                color="error"
                @click="removeSelectedCourse(props.item.id)"
              >삭제</v-btn>
              <v-btn
                v-else
                small
                color="info"
                :disabled="isSlotFull"
                @click="selectCourse(props.item)"
              >추가</v-btn>
            </td>
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
  layout: 'course-schedule',
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
        { text: '코드 및 분반', value: 'id', width: '130' },
        { text: '교과목명', value: 'name', width: '240' },
        { text: '담당교수', value: 'professor', width: '100' },
        { text: '학년', value: 'grade', width: '40' },
        { text: '학점', value: 'credit', width: '40' },
        { text: '이수구분', value: 'type1', width: '110' },
        { text: '강의구분', value: 'type2', width: '130' },
        { text: '대상학부', value: 'targetDepartment', width: '240' },
        { text: '대상', value: 'target', width: '170' },
        { text: '시간', value: 'time', width: '240' },
        { text: '장소', value: 'place', width: '240' },
        { text: '학강실설', value: 'creditDetail', width: '90' },
        { text: '정원', value: 'limit', width: '40' },
        { sortable: false, width: '110' }
      ],
      courses: [],
      keyword: '',
      rowsPerPage: [10, 20, 30, 50, 100],
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
  computed: {
    selectedCourseIds () {
      return this.$store.state.selectedCourses.map((course) => {
        return course.id
      })
    },
    selectedCourseCount () {
      return this.$store.state.selectedCourses.length
    },
    maxSelectableCourseCount () {
      return this.$store.state.maxSelectableCourseCount
    },
    isSlotFull () {
      return this.selectedCourseCount >= this.maxSelectableCourseCount
    }
  },
  methods: {
    getCourses () {
      this.isLoadingCourses = true
      const query = `{
        courses(categoryId: "${this.selectedCategoryId}") {
          id
          name
          professor
          grade
          credit
          type1
          type2
          targetDepartment
          target
          time
          place
          creditDetail
          limit
          timeData
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
          this.$refs.searchField.$emit('input')
          this.isLoadingCourses = false
        })
    },
    selectCourse (course) {
      if (this.isSlotFull) {
        alert(`최대 ${this.maxSelectableCourseCount}개의 강의를 추가할 수 있습니다.`)
      } else {
        this.$store.commit('selectCourse', course)
      }
    },
    removeSelectedCourse (courseId) {
      this.$store.commit('removeSelectedCourse', courseId)
    }
  }
}
</script>
