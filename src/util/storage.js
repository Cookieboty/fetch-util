/*
 * @Author: Cookie
 * @Date: 2020-06-22 19:26:03
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-25 22:48:57
 * @FilePath: /fetch-uitl/src/util/stroage.js
 * @Description:
 */

class Storage {
    constructor(props) { // 根据类型跟缓存时间，初始化缓存方法
        const { type, time = 5000, cacheSize = 2.5 } = props
        this.type = type
        this.time = time
        this.cacheSize = cacheSize * 1024 * 1024
        console.log(this.cacheSize)

        this.storageType = {
            local: 'localStorage',
            session: 'sessionStorage',
            cookie: 'cookie',
            indexDb: 'indexDb',
            nomal: 'nomal'
        }
        this.initEstimate()
        console.log(this.getCacheSize(type))
    }

    getCacheSize(t = 'local') {
        let storage = "";
        if (t === 'local') {
            if (!window.localStorage) {
                console.log('浏览器不支持localStorage');
            } else {
                storage = window.localStorage;
            }
        } else {
            if (!window.sessionStorage) {
                console.log('浏览器不支持sessionStorage');
            } else {
                storage = window.sessionStorage;
            }
        }
        if (storage !== "") {
            let size = 0;
            for (let item in storage) {
                if (storage.hasOwnProperty(item)) {
                    size += storage.getItem(item).length;
                }
            }
            return size
        }
    }

    initEstimate() {
        if (navigator && navigator.storage) {
            navigator.storage.estimate().then(estimate => {
                this.usage = estimate.usage
                this.quota = estimate.quota
                console.log(this.usage, this.quota)
            });
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