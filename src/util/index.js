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

export default {
  consuming,
  debounce,
  method,
  throttle
}