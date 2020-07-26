class RequestMiddle {
  constructor() {
    this.$middlewares = []
    this.$events = {}
  }

  // 注册中间件
  use() {
    [...arguments].forEach(item => {
      if (typeof item === 'function') {
        this.$middlewares.push(item)
      }
    })
  }

  /**
   * 每个中间件只有两个形参 第一是传进来的参数 第二个是调用下一个中间件的函数
   * 中间件的执行顺序是根据你注册中间件的顺序来去调用的 
   */
  next(params) {
    let index = 0
    function next(params) {
      if (index <= this.$middlewares.length - 1) {
        const ware = this.$middlewares[index]
        index++
        ware.call(this, params, next.bind(this))
      }
    }
    next.call(this, params)
  }

  /**
   * 注册事件
   * @param {String} name 事件名称 
   * @param {Function (params)} callback 回调函数 
   */
  on(name, callback) {
    if (typeof callback === 'function') {
      this.$events[name] = callback
    } else {
      throw '事件回调必须为函数'
    }
  }

  /**
   * 发射(触发)事件
   * @param {String} name 事件名称 
   * @param {Any} params 回调参数 
   */

  emit(name, params) {
    if (this.$events[name]) {
      let callback = this.$events[name]
      callback.call(this, params)
    } else {
      throw '没有注册这个事件'
    }
  }

  send(params) {
    this.next(params)
  }
}

export default RequestMiddle