import { get, post } from './baseFetch';

const prefix = 'users'

const getUser = async (params) => {
  try {
    const data = get({
      url: `${prefix}/octocat`,
      params
    })
    return data
  } finally { }
}

const setUser = (params) => {
  try {
    const data = post({
      url: `${prefix}/octocat`,
      params
    })
    return data
  } finally { }
}
export {
  getUser,
  setUser
};

export default {
  getUser,
  setUser
}
