/*
 * @Author: Cookie
 * @Date: 2020-06-22 17:09:21
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-22 19:24:32
 * @FilePath: /fetch-uitl/src/fetch.js
 * @Description: 
 */
import qs from 'qs'

class Fetch {

    constructor(props = {}) {
        this.config = {
            cache: 'no-cache', // * default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {},
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
            timeOut: 3000,
            ...props
        }
    }

    send({ url, params, method = "GET", headers }) {

        // 发送 ajax 请求
        const ajax = new Promise((resolve) => {
            fetch(url, {
                ...this.config,
                body: params,
                headers,
                method,
            }).then((response) => {
                return response.json()
            }).then((data) => {
                resolve(data)
            })
        })

        // 设置超时时间
        const time = new Promise((reject) => {
            console.log(this.config.timeOut)
            setTimeout(() => {
                reject('time out')
            }, this.config.timeOut);
        })

        return Promise.race([ajax, time])

    }

    // 封装请求
    get({ url, params, headers }) {
        return this.send({ url: `${url}?${qs.stringify(params)}`, headers, method: 'GET' })
    }

    post({ url, params, headers }) {
        return this.send({ url, params, headers, method: 'POST' })
    }

}


export default Fetch