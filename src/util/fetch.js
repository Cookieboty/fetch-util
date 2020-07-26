/*
 * @Author: Cookie
 * @Date: 2020-06-22 17:09:21
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-26 00:32:42
 * @FilePath: /fetch-uitl/src/fetch.js
 * @Description: 
 */
import qs from 'qs'
import Storage from './storage'

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
            cacheType = ''
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

        this.cacheStorage = cacheType ? new Storage({ type: cacheType }) : ''

        this.dataOperation = {
            JSON: {
                headers: {
                    'Content-Type': 'application/json', // 告诉服务器，我们提交的数据类型为 json 格式
                },
                formatting(params) {
                    return JSON.stringify(params)
                }
            },
            FormData: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded' // 告诉服务器，我们提交的数据类型为 FormData 格式
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

    send({ url, FetchConfig }) {
        // 发送 ajax 请求
        const { BASE_URL, timeOut } = this.config
        const ajax = new Promise((resolve, reject) => {
            fetch(BASE_URL ? `${BASE_URL}/${url}` : url, FetchConfig).then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    reject({
                        status: response.status,
                        msg: response.statusText
                    })
                }
            }).then((data) => {
                resolve(data)
            })
        })
        // 设置超时时间
        const time = new Promise((resolve, reject) => {
            setTimeout(() => {
                reject('time out')
            }, timeOut);
        })

        return Promise.race([ajax, time])
    }

    preSend({ url, params, headers, method }) {
        const { requestType } = this.config
        const FetchConfig = {
            ...this.FetchConfig,
            method,
            headers: {
                ...this.dataOperation[requestType].headers,
                ...headers
            },
        };
        if (!!params) FetchConfig.body = this.dataOperation[requestType].formatting(params);
        return this.send({
            url,
            FetchConfig
        })
    }

    // 封装请求
    get({ url, query, headers }) {
        const key = query ? `${url}?${qs.stringify(query)}` : url
        if (this.cacheStorage) {
            if (this.cacheStorage.getItem(key)) {
                return Promise.resolve(this.cacheStorage.getItem(key))
            } else {
                return this.preSend({ url: key, headers, method: 'GET' }).then(data => {
                    this.cacheStorage.setItem(key, data)
                    return data
                })
            }
        } else {
            return this.preSend({ url: key, headers, method: 'GET' })
        }
    }

    post({ url, query, params = {}, headers }) {
        return this.preSend({ url: query ? `${url}?${qs.stringify(query)}` : url, params, headers, method: 'POST' })
    }
}

export default Fetch