/*
 * @Author: Cookie
 * @Date: 2020-06-22 17:09:21
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-25 21:52:31
 * @FilePath: /fetch-uitl/src/fetch.js
 * @Description: 
 */
import qs from 'qs'

class Fetch {
    constructor(config = {}) {
        
        const {
            cache = 'no-cache', // * default, no-cache, reload, force-cache, only-if-cached
            credentials = 'same-origin', // include, same-origin, *omit
            headers = {},
            mode = 'cors', // no-cors, cors, *same-origin
            redirect = 'follow', // manual, *follow, error
            referrer = 'no-referrer', // *client, no-referrer
            timeOut = 3000, // 超时时间
            BASE_URL = '',
            requestType = 'JSON',
        } = config

        this.FetchConfig = {
            cache,
            credentials,
            headers,
            mode,
            redirect,
            referrer,
        }
        
        this.config = {
            timeOut,
            BASE_URL,
            requestType,
        }

        this.dataOperation = {
            JSON: {
                headers: {
                    'Accept': 'application/json', // 告诉服务器，我们能接受json格式的返回类型，
                    'Content-Type': 'application/json', // 告诉服务器，我们提交的数据类型
                },
                formatting(params) {
                    return JSON.stringify(params)
                }
            },
            FormData: {
                headers: {
                    'Accept': 'application/json', // 告诉服务器，我们能接受json格式的返回类型，
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                formatting(params) {
                    let _formData = new FormData();
                    Object.keys(params).forEach(key => {
                        _formData.append(key, params[key]);
                    })
                    return _formData
                }
            }
        }
    }

    send({ url, params, method = "GET", headers }) {
        // 发送 ajax 请求
        const { BASE_URL } = this.config
        const ajax = new Promise((resolve) => {
            fetch(BASE_URL ? `${BASE_URL}/${url}` : url, {
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
    get({ url, query = '', params = {}, headers }) {
        const { requestType } = this.config
        return this.send({
            url: query ? `${url}?${qs.stringify(query)}` : url,
            params: this.dataOperation[requestType].formatting(params),
            headers: {
                ...this.dataOperation[requestType].headers,
                ...headers
            }, method: 'GET'
        })
    }

    post({ url, query = '', params = {}, headers }) {
        const { requestType } = this.config
        return this.send({
            url: query ? `${url}?${qs.stringify(query)}` : url,
            params: this.dataOperation[requestType].formatting(params),
            headers: {
                ...this.dataOperation[requestType].headers,
                ...headers
            }, method: 'POST'
        })
    }
}

export default Fetch