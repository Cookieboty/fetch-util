/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-25 21:44:24
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */

import Fetch from './util/fetch'

const fetch = new Fetch({ requestType: "FormData" });

fetch.post({
    url: 'https://api.github.com/users/octocat',
    params: {
        test: 1
    }
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

