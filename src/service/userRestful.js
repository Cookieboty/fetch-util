
import baseFetch from './baseFetch';

const prefix = 'users'

const methods = ['get', 'post', 'put', 'delete']

const userUrl = {
  users: 'octocats',
  user: 'octocat'
}

const user = {}
Object.keys(userUrl).forEach(key => {
  user[key] = {}
  methods.forEach(method => {
    user[key][method] = (params) => {
      return baseFetch[method](`${prefix}/${userUrl[key]}`, params)
    }
  })
})

export {
  user
};

export default {
  user
}
