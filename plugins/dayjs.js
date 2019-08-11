import dayjs from 'dayjs'
import ko from 'dayjs/locale/ko'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.locale('ko', ko)
dayjs.extend(customParseFormat)

export default dayjs
