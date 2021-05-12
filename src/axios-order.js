import axios from 'axios'

const instance=axios.create({
    baseURL:'https://react-burgur-7ac67-default-rtdb.firebaseio.com/'
})
export default instance