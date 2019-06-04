import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://server-db-v2.herokuapp.com/'
  })
}
