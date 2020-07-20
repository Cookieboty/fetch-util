/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-07-02 19:17:33
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */
import Storage from './util/storage'

const storage = new Storage({ cacheSize: 0.00015, time: 10000000000 })

console.log(storage)

// storage.setItem('test3', { sss: '33333' })
// storage.setItem('test1', 111111111211)
// storage.setItem('test2', { sss: 'ssss' })
// storage.setItem('test4', 'test4')
storage.setItem('test5', 'tes敖德萨所大tes敖德萨所大所t4所t4')

