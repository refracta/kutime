<template>
  <v-footer
    fixed
    app
  >
    <span v-if="time">&nbsp&nbsp&nbsp마지막 업데이트 시각: {{ timeString }} ({{ytInfo}}, {{size}} bytes)</span>
  </v-footer>
</template>

<script>
import axios from '../plugins/axios'

function formatDate (date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`
}
export default {
  name: 'global-footer',
  data () {
    return {
      time: undefined,
      size: undefined,
      ytInfo: '',
      timeString: ''
    }
  },
  mounted () {
    this.fetchTime()
  },
  methods: {
    fetchTime () {
      axios.get('/api/info')
        .then(response => {
          this.time = new Date(response.data.time)
          this.size = response.data.size
          this.ytInfo = response.data.year + '년 ' + response.data.term
          this.timeString = formatDate(this.time)
        })
        .catch(error => {
          console.error('Error fetching time:', error)
        })
    }
  }
}
</script>
