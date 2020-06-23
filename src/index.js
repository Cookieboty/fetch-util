/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-22 19:48:01
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */

import Fetch from './util/fetch'

const fetch = new Fetch();

fetch.get({
    url: 'https://api.github.com/users/chriscoyier/repos',
    params: {
        test: 1
    }
}).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})