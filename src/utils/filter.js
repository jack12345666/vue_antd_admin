import { BASEURL } from './config'
import moment from 'moment'

export const imgFormat = value => {
  if(value.startsWith("http")) {
    return value
  }else {
    return BASEURL + value
  }
    
  }

  export const timeFormat = value => {
     if(value) {
      return  moment(value).format('YYYY-MM-DD')
     }else {
       return '-'
     }
  }