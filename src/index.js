/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-26 00:32:14
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */

import Fetch from './util/fetch';

const fetch = new Fetch({ requestType: "JSON", cacheType: 'local' });

fetch.get({
    url: 'https://api.github.com/users/octocat',
    params: {
        test: 1
    }
}).then(data => {
    console.log('data====>', data)
}).catch(err => {
    console.log('err====>', err)
})

