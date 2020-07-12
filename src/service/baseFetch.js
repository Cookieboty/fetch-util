import Fetch from '../util/fetch';

const prefix = 'https://api.github.com'

const fetch = new Fetch({ requestType: "JSON", cacheType: 'local', BASE_URL: prefix });

const get = (url, query) => {
  return new Promise((resolve, reject) => {
    fetch.get({
      url,
      query
    }).then(response => {
      const { data, code, errMessage } = response
      if (code) {
        resolve(data)
      } else {
        reject(errMessage)
      }
    })
  })
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch.post({
      url,
      params
    }).then(response => {
      const { data, code, errMessage } = response
      if (code) {
        resolve(data)
      } else {
        reject(errMessage)
      }
    })
  })
}

export {
  get,
  post
};


export default {
  get,
  post
}