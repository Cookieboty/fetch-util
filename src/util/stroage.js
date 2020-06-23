/*
 * @Author: Cookie
 * @Date: 2020-06-22 19:26:03
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-22 19:50:38
 * @FilePath: /fetch-uitl/src/util/stroage.js
 * @Description:
 */

class Storage {

    constructor(props) { // 根据类型跟缓存时间，初始化缓存方法
        const { type, time } = props
        this.type = type
        this.time = time
        this.storageType = {
            local: 'localStorage',
            session: 'sessionStorage',
            cookie: 'cookie',
            indexDb: 'indexDb',
            nomal: 'nomal'
        }
    }

    setItem(key, value) { // 代理原生缓存方法，添加缓存时间
        window[this.storageType[this.type]].setItem(key, JSON.stringify({
            value,
            time: new Date().getTime()
        }));
    }

    getItem(key) { // 代理原生获取缓存方法，根据缓存时间，判断数据是否过期
        try {
            const { time, value } = JSON.parse(window[this.storageType[this.type]].getItem(key));
            const now = new Date().getTime()
            if (now > time + this.time) {
                window[this.storageType[this.type]].removeItem(key);
                return null
            } else {
                return value
            }
        } catch (e) {
            return null
        }
    }
}

export default Storage