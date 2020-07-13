
import baseFetch from './baseFetch';

const prefix = 'users'

const methods = ['get', 'post', 'put', 'delete']

const userObj = {
  users: {
    url: 'octocats',
    get(data) { return data }
  },
  user: {
    url: 'octocats',
    post(data) { return data }
  }
}

const user = {}
Object.keys(userObj).forEach(key => {
  user[key] = {}
  methods.forEach(method => {
    user[key][method] = (params) => {
      return new Promise((resolve) => {
        baseFetch[method](`${prefix}/${userObj[key].url}`, params).then(data => {
          if (userObj[key][method]) resolve(userObj[key][method](data))
          resolve(data)
        })
      })
    }
  })
})

export {
  user
};

export default {
  user
}
