/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-07-02 19:17:33
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */

import userRestful from './service/userRestful'

console.log(userRestful.user)

userRestful.user.users.get({ test: 1 })
