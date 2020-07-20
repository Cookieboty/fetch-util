/*
 * @Author: Cookie
 * @Date: 2020-06-22 19:26:03
 * @LastEditors: Cookie
 * @LastEditTime: 2020-06-25 22:48:57
 * @FilePath: /fetch-uitl/src/util/stroage.js
 * @Description:
 */

class Storage {
    constructor(props = {}) { // 根据类型跟缓存时间，初始化缓存方法
        const { type = 'local', time = 5000, cacheSize = 2.5 } = props
        this.type = type
        this.time = time
        this.cacheSize = cacheSize * 1024 * 1024
        this.usage = 0
        this.storageType = {
            local: 'localStorage',
            session: 'sessionStorage',
            cookie: 'cookie',
            indexDb: 'indexDb',
            normal: 'normal'
        }

        this.initEstimate()
    }

    getCacheSize() {
        let storage = window[this.storageType[this.type]];
        if (storage !== "") {
            let size = 0;
            for (let item in storage) {
                if (storage.hasOwnProperty(item)) {
                    size += this.getSize(storage.getItem(item))
                }
            }
            return size
        }
        return false
    }

    getCacheSort() {
        let storage = window[this.storageType[this.type]];
        if (storage !== "") {
            let storageList = [];
            for (let item in storage) {
                if (storage.hasOwnProperty(item)) {
                    storageList.push({
                        key: item,
                        value: storage.getItem(item)
                    })
                }
            }
            return storageList.sort((a, b) => {
                return JSON.parse(a.value).time - JSON.parse(b.value).time
            })
        }
        return false
    }

    judgeMemory(value) {
        if (this.getSize(value) + this.usage > this.cacheSize) {
            const storageList = this.getCacheSort()
            for (let { key, value } of storageList) {
                if (this.getSize(value) + this.usage < this.cacheSize) break
                this.usage = this.usage - this.getSize(value)
                this.baseRemoveItem(key)[this.type].apply(this)
            }
        } else {
            this.usage = this.getSize(value) + this.usage
        }
    }

    getSize(str, charset) {
        let total = 0,
            charCode,
            i,
            len;
        charset = charset ? charset.toLowerCase() : '';
        if (charset === 'utf-16' || charset === 'utf16') {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0xffff) {
                    total += 2;
                } else {
                    total += 4;
                }
            }
        } else {
            for (i = 0, len = str.length; i < len; i++) {
                charCode = str.charCodeAt(i);
                if (charCode <= 0x007f) {
                    total += 1;
                } else if (charCode <= 0x07ff) {
                    total += 2;
                } else if (charCode <= 0xffff) {
                    total += 3;
                } else {
                    total += 4;
                }
            }
        }
        return total;
    }

    initEstimate() {
        if (navigator && navigator.storage) {
            navigator.storage.estimate().then(estimate => {
                this.usage = estimate.usage
                this.quota = estimate.quota
                console.log(this.usage, this.quota)
            });
        } else {
            this.usage = this.getCacheSize(this.type)
        }
        console.log('usage', this.usage)
    }

    baseSetItem(key, value) { // 接管原生新增方法
        return {
            local() { window[this.storageType[this.type]].setItem(key, value) },
            session() { window[this.storageType[this.type]].setItem(key, value) },
            cookie() { },
            indexDb() { },
            normal() {
                if (!window.baseStorage) {
                    window.baseStorage = {}
                } else {
                    window.baseStorage[key] = value
                }
            },
        }
    }

    baseRemoveItem(key) { // 接管原生删除方法
        return {
            local() { window[this.storageType[this.type]].removeItem(key) },
            session() { window[this.storageType[this.type]].removeItem(key) },
            cookie() { },
            indexDb() { },
            normal() {
                delete window.baseStorage[key]
            },
        }
    }

    setItem(key, value) { // 代理原生缓存方法，添加缓存时间
        try {
            if (!value) return
            const reValue = JSON.stringify({
                value,
                time: new Date().getTime()
            })
            this.judgeMemory(reValue)
            this.baseSetItem(key, reValue)[this.type].apply(this)
        } catch (error) {
            console.log(error)
        }
    }

    getItem(key) { // 代理原生获取缓存方法，根据缓存时间，判断数据是否过期
        try {
            const { time, value } = JSON.parse(window[this.storageType[this.type]].getItem(key));
            const now = new Date().getTime()
            if (now > time + this.time) {
                this.baseRemoveItem(key)[this.type].apply(this)
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