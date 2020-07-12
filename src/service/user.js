import { get, post } from './baseFetch';

const prefix = 'users'

const getUser = async (params) => {
  try {
    const data = get({
      url: `${prefix}/octocat`,
      params
    })
    return data
  }
}

const setUser = (params) => {
  try {
    const data = post({
      url: `${prefix}/octocat`,
      params
    })
    return data
  }
}

export {
  getUser,
  setUser
};

export default {
  getUser,
  setUser
}
