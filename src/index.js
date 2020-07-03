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

    @method('GET', 'https://api.github.com/users/octocat')
    getOct(params, query) {
        console.log(params, query)
        console.log('result==>', this.result)
    }
}

const business = new Business()

business.getOct({
    test: 1
}, {
    test: 2
}
)
