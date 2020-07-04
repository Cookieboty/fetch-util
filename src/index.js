/*
 * @Author: Cookie
 * @Date: 2020-06-22 16:23:02
 * @LastEditors: Cookie
 * @LastEditTime: 2020-07-02 19:17:33
 * @FilePath: /fetch-uitl/src/index.js
 * @Description:
 */
import Fetch from './util/fetch';

const fetch = new Fetch({ requestType: "JSON", cacheType: 'local' });

function throttle(wait) {
    let timeout;
    return (target, name, descriptor) => {
        return {
            ...descriptor,
            value(query) {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        timeout = null;
                        descriptor.value.apply(this, [...arguments])
                    }, wait)
                }
            }
        }
    }
}

function debounce(wait, immediate) {
    let timer;
    return (target, name, descriptor) => {
        return {
            ...descriptor,
            value(query) {
                if (timer) clearTimeout(timer);
                if (immediate) {
                    let callNow = !timer;
                    timer = setTimeout(() => {
                        timer = null;
                    }, wait);
                    if (callNow) descriptor.value.apply(this, [...arguments]);
                } else {
                    timer = setTimeout(() => {
                        descriptor.value.apply(this, [...arguments])
                    }, wait)
                }
            }
        }
    }
}

function consuming(target, name, descriptor) {
    return {
        ...descriptor,
        value(query) {
            try {
                console.time('consuming')
                console.log('发送埋点', query)
                descriptor.value.apply(this, [...arguments])
            } finally {
                console.timeEnd('consuming')
            }
        }
    }
}

const method = (type, url) => {
    switch (type) {
        case 'GET': {
            return (target, name, descriptor) => {
                return {
                    ...descriptor,
                    value(query) {
                        fetch.get({
                            url,
                            query
                        }).then(data => {
                            descriptor.value.apply({ result: data }, [...arguments])
                        }).catch(err => {
                            console.log('err====>', err)
                        })
                    }
                }
            }
        }
        default: {
            return (target, name, descriptor) => {
            }
        }
    }
}

class Business {
    @throttle(3000)
    @consuming
    @method('GET', 'https://api.github.com/users/octocat')
    getOct(params) {
        console.log(params)
        console.log('result==>', this.result)
    }
}

const business = new Business()

business.getOct({
    test: 1
})
business.getOct({
    test: 1
})

business.getOct({
    test: 1
})
business.getOct({
    test: 1
})
business.getOct({
    test: 1
})
business.getOct({
    test: 1
})