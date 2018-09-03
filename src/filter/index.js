import Vue from 'vue'
export default {
  init () {
    const Fliter = {
      timeToDay: value => {
        let day = ''
        value = parseInt(value)
        switch (value) {
          case 1:
            day = 'Monday'
            break
          case 2:
            day = 'Tuesday'
            break
          case 3:
            day = 'Wednesday'
            break
          case 4:
            day = 'Thursday'
            break
          case 5:
            day = 'Friday'
            break
          case 6:
            day = 'Saturday'
            break
          case 0:
            day = 'Sunday'
            break
          default :
            day = 'pull a worry num!!'
            break
        }
        return day
      }
    }

    Object.keys(Fliter).forEach(key => {
      Vue.filter(key, Fliter[key])
    })
  }
}
