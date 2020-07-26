/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-07-02 19:17:33
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */
// import Storage from './util/storage'

// const storage = new Storage({ cacheSize: 0.00015, time: 10000000000 })

// console.log(storage)

// storage.setItem('test3', { sss: '33333' })
// storage.setItem('test1', 111111111211)
// storage.setItem('test2', { sss: 'ssss' })
// storage.setItem('test4', 'test4')
// storage.setItem('test5', 'tes敖德萨所大tes敖德萨所大所t4所t4')

import Middleware from './util/Middleware';
const middleware = new Middleware()

function judge1(options, next) { // 空数校验
  if (!options.data) {
    options.promise.reject({ data: false, msg: '数据为空' })
    return
  }
  next(options); // 通过验证
}

function judge2(options, next) { // 判断小于10
  if (options.data < 10) {
    options.promise.reject({ data: false, msg: '数据小于10' })
    return
  }
  next(options); // 通过验证
}

function judge3(options, next) { // 判断大于30
  if (options.data < 30) {
    options.promise.reject({ data: false, msg: '数据小于30' })
    return
  }
  options.promise.resolve({ data: true, msg: '数据小于30' })
}

middleware.use(judge1).use(judge2).use(judge3)

middleware.executeFc({ data: 40 }).then(({ data }) => {
  console.log('finally', data)
}).catch(({ msg }) => {
  console.log(msg)
})


// function transform(options, next) {
//   console.log('before', options.data);
//   options.data.age = Number(options.data.age)
//   next(options); // 通过验证
// }

// function validate(options, next) {
//   console.log('validate', options.data);
//   next(options); // 通过验证
// }

// function send(options, next) {
//   this.emit('request', options)
//   setTimeout(() => { // 模拟异步
//     console.log('send', options.data);
//     this.emit('response', options)
//     options.promise.resolve({ data: options.data })
//   }, 100);
// }

// // 请求之前的回调函数
// middleware.on('request', params => {
//   // 在这里可以做请求之前的一些处理，比如添加全局参数等
//   console.log(params, '再多做一些处理')
// })

// // 请求成功的回调函数
// middleware.on('response', params => {
//   // 在这里可以做下请求成功的一些处理，比如全局loading什么的
//   console.log(params, '请求成功')
// })

// middleware.use(transform).use(validate).use(send)

// middleware.executeFc({ data: { name: 'cookie', age: '20' } }).then(({ data }) => {
//   console.log('finally', data)
// });