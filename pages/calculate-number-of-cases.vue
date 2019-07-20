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
        :disabled="isLoadingCases"
        :loading="isLoadingCases"
        @click="calculateCases"
      >계산</v-btn>
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
          :items="calculatedCases"
          item-key="num"
          :search="keyword"
          :rows-per-page-items="rowsPerPage"
        >
          <template v-slot:items="props">
            <td>{{ props.item.num }}</td>
            <td>{{ props.item.totalCount }}</td>
            <td>{{ props.item.totalCredit }}</td>
            <td>{{ props.item.nameList }}</td>
          </template>
        </v-data-table>
      </v-card>
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
      excludedCourseGroups: [],
      headers: [
        { text: '번호', value: 'num', width: '90' },
        { text: '과목개수', value: 'totalCount', width: '90' },
        { text: '학점합계', value: 'totalCredit', width: '90' },
        { text: '과목명', value: 'nameList', sortable: false, width: '990' }
      ],
      calculatedCases: [],
      keyword: '',
      rowsPerPage: [10, 20, 30],
      isLoadingCases: false
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
      return this.$store.state.selectedCourses.map((course) => {
        const timeSlots = []
        const dailySchedules = course.timeData.match(/(D[T0-9]+)/g)
        dailySchedules.forEach((schedule) => {
          const fragments = schedule.match(/[DT]([0-9]+)/g)
          const dayValue = Number(fragments.shift().slice(1))
          const slotValues = fragments.map((fragment) => {
            return dayValue * 100 + Number(fragment.slice(1))
          })
          timeSlots.push(...slotValues)
        })
        return {
          ...course,
          timeSlots
        }
      })
    },
    orderedCourses () {
      return this.selectedCourses.slice().sort((former, latter) => {
        return former.id.localeCompare(latter.id)
      })
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
    },
    activeGroups () {
      return this.courseGroups
        .filter((group) => {
          return !group.isExcluded
        })
        .map((group) => {
          const choices = this.orderedCourses.filter((course) => {
            return course.id.startsWith(group.idPrefix)
          })
          if (!group.isLocked) {
            choices.unshift(null)
          }
          return {
            ...group,
            choices
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
    },
    calculateCases () {
      this.isLoadingCases = true
      return new Promise((resolve, reject) => {
        const validCases = []
        const reversedChoiceCounts = this.activeGroups
          .map((group) => {
            return group.choices.length
          })
          .reverse()
        let maxCaseCount = 1
        this.activeGroups.forEach((group) => {
          maxCaseCount *= group.choices.length
        })
        for (let caseIndex = 0; caseIndex < maxCaseCount; caseIndex += 1) {
          const choiceIndexes = []
          const chosenCourseNames = []
          const chosenTimeSlots = []
          let uniqueSlots = []
          let totalSlotCount = 0
          let totalCourseCount = 0
          let totalCredit = 0
          let isOverlapped = false
          let temp = caseIndex
          reversedChoiceCounts.forEach((choiceCount) => {
            choiceIndexes.unshift(temp % choiceCount)
            temp = Math.floor(temp / choiceCount)
          })
          this.activeGroups.forEach((group, index) => {
            const choice = group.choices[choiceIndexes[index]]
            if (choice) {
              chosenCourseNames.push(choice.name)
              chosenTimeSlots.push(...choice.timeSlots)
              totalSlotCount += choice.timeSlots.length
              totalCourseCount += 1
              totalCredit += Number(choice.credit)
            }
          })
          uniqueSlots = [...(new Set(chosenTimeSlots))]
          isOverlapped = (totalSlotCount !== uniqueSlots.length)
          if (totalCourseCount > 0 && !isOverlapped) {
            validCases.push({
              num: 1 + validCases.length,
              totalCount: totalCourseCount,
              totalCredit: totalCredit.toFixed(1),
              nameList: chosenCourseNames.join(', ')
            })
          }
        }
        resolve(validCases)
      })
        .then((cases) => {
          this.calculatedCases = cases
        })
        .finally(() => {
          this.$refs.searchField.$emit('input')
          this.isLoadingCases = false
        })
    }
  }
}
</script>
