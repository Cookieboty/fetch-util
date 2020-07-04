!function(e){"function"==typeof define&&define.amd?define(e):e()}(function(){"use strict";var w=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var t=function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e};var e=function(r,n,e,t,o){var i={};return Object.keys(t).forEach(function(e){i[e]=t[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=e.slice().reverse().reduce(function(e,t){return t(r,n,e)||e},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(r,n,i),i=null),i};var o=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n};var r=function(e){if(Array.isArray(e))return o(e)};var i=function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)};var a=function(e,t){if(e){if("string"==typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}};var c=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var u=function(e){return r(e)||i(e)||a(e)||c()};var l=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e};function s(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)void 0!==e[n]&&(r[n]=e[n]);return r}function S(e,t){C.apply(e,A(t)?t:[t])}function P(e,t,r,n,o,i,a,c,u,l,s,f,p){var y,d=e;if("function"==typeof a?d=a(t,d):d instanceof Date?d=l(d):"comma"===r&&A(d)&&(d=D.maybeMap(d,function(e){return e instanceof Date?l(e):e}).join(",")),null===d){if(n)return i&&!f?i(t,F.encoder,p,"key"):t;d=""}if("string"==typeof(y=d)||"number"==typeof y||"boolean"==typeof y||"symbol"===k(y)||"bigint"==typeof y||D.isBuffer(d))return i?[s(f?t:i(t,F.encoder,p,"key"))+"="+s(i(d,F.encoder,p,"value"))]:[s(t)+"="+s(String(d))];var h,m,v=[];if(void 0===d)return v;m=A(a)?a:(h=Object.keys(d),c?h.sort(c):h);for(var b=0;b<m.length;++b){var g,O=m[b],j=d[O];o&&null===j||(g=A(d)?"function"==typeof r?r(t,O):t:t+(u?"."+O:"["+O+"]"),S(v,P(j,g,r,n,o,i,a,c,u,l,s,f,p)))}return v}var f,p,y,d,k=(function(t){function r(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=r=function(e){return typeof e}:t.exports=r=function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}t.exports=r}(f={exports:{}}),f.exports),h=Object.prototype.hasOwnProperty,m=Array.isArray,v=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),D={arrayToObject:s,assign:function(e,r){return Object.keys(r).reduce(function(e,t){return e[t]=r[t],e},e)},combine:function(e,t){return[].concat(e,t)},compact:function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],a=Object.keys(i),c=0;c<a.length;++c){var u=a[c],l=i[u];"object"===k(l)&&null!==l&&-1===r.indexOf(l)&&(t.push({obj:i,prop:u}),r.push(l))}return function(e){for(;1<e.length;){var t=e.pop(),r=t.obj[t.prop];if(m(r)){for(var n=[],o=0;o<r.length;++o)void 0!==r[o]&&n.push(r[o]);t.obj[t.prop]=n}}}(t),e},decode:function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(e){return n}},encode:function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===k(e)?n=Symbol.prototype.toString.call(e):"string"!=typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"});for(var o="",i=0;i<n.length;++i){var a=n.charCodeAt(i);45===a||46===a||95===a||126===a||48<=a&&a<=57||65<=a&&a<=90||97<=a&&a<=122?o+=n.charAt(i):a<128?o+=v[a]:a<2048?o+=v[192|a>>6]+v[128|63&a]:a<55296||57344<=a?o+=v[224|a>>12]+v[128|a>>6&63]+v[128|63&a]:(i+=1,a=65536+((1023&a)<<10|1023&n.charCodeAt(i)),o+=v[240|a>>18]+v[128|a>>12&63]+v[128|a>>6&63]+v[128|63&a])}return o},isBuffer:function(e){return!(!e||"object"!==k(e))&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},maybeMap:function(e,t){if(m(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)},merge:function n(o,i,a){if(!i)return o;if("object"!==k(i)){if(m(o))o.push(i);else{if(!o||"object"!==k(o))return[o,i];(a&&(a.plainObjects||a.allowPrototypes)||!h.call(Object.prototype,i))&&(o[i]=!0)}return o}if(!o||"object"!==k(o))return[o].concat(i);var e=o;return m(o)&&!m(i)&&(e=s(o,a)),m(o)&&m(i)?(i.forEach(function(e,t){var r;h.call(o,t)?(r=o[t])&&"object"===k(r)&&e&&"object"===k(e)?o[t]=n(r,e,a):o.push(e):o[t]=e}),o):Object.keys(i).reduce(function(e,t){var r=i[t];return h.call(e,t)?e[t]=n(e[t],r,a):e[t]=r,e},e)}},b=String.prototype.replace,g=/%20/g,O={RFC1738:"RFC1738",RFC3986:"RFC3986"},j=D.assign({default:O.RFC3986,formatters:{RFC1738:function(e){return b.call(e,g,"+")},RFC3986:function(e){return String(e)}}},O),T=Object.prototype.hasOwnProperty,E={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},A=Array.isArray,C=Array.prototype.push,N=Date.prototype.toISOString,x=j.default,F={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:D.encode,encodeValuesOnly:!1,format:x,formatter:j.formatters[x],indices:!1,serializeDate:function(e){return N.call(e)},skipNulls:!1,strictNullHandling:!1},I=(Object.prototype.hasOwnProperty,Array.isArray,function(e,t){var r=e,n=function(e){if(!e)return F;if(null!==e.encoder&&void 0!==e.encoder&&"function"!=typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||F.charset;if(void 0!==e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=j.default;if(void 0!==e.format){if(!T.call(j.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=j.formatters[r],o=F.filter;return"function"!=typeof e.filter&&!A(e.filter)||(o=e.filter),{addQueryPrefix:"boolean"==typeof e.addQueryPrefix?e.addQueryPrefix:F.addQueryPrefix,allowDots:void 0===e.allowDots?F.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"==typeof e.charsetSentinel?e.charsetSentinel:F.charsetSentinel,delimiter:void 0===e.delimiter?F.delimiter:e.delimiter,encode:"boolean"==typeof e.encode?e.encode:F.encode,encoder:"function"==typeof e.encoder?e.encoder:F.encoder,encodeValuesOnly:"boolean"==typeof e.encodeValuesOnly?e.encodeValuesOnly:F.encodeValuesOnly,filter:o,formatter:n,serializeDate:"function"==typeof e.serializeDate?e.serializeDate:F.serializeDate,skipNulls:"boolean"==typeof e.skipNulls?e.skipNulls:F.skipNulls,sort:"function"==typeof e.sort?e.sort:null,strictNullHandling:"boolean"==typeof e.strictNullHandling?e.strictNullHandling:F.strictNullHandling}}(t);"function"==typeof n.filter?r=(0,n.filter)("",r):A(n.filter)&&(c=n.filter);var o,i=[];if("object"!==k(r)||null===r)return"";o=t&&t.arrayFormat in E?t.arrayFormat:!(t&&"indices"in t)||t.indices?"indices":"repeat";var a=E[o],c=c||Object.keys(r);n.sort&&c.sort(n.sort);for(var u=0;u<c.length;++u){var l=c[u];n.skipNulls&&null===r[l]||S(i,P(r[l],l,a,n.strictNullHandling,n.skipNulls,n.encode?n.encoder:null,n.filter,n.sort,n.allowDots,n.serializeDate,n.formatter,n.encodeValuesOnly,n.charset))}var s=i.join(n.delimiter),f=!0===n.addQueryPrefix?"?":"";return n.charsetSentinel&&("iso-8859-1"===n.charset?f+="utf8=%26%2310003%3B&":f+="utf8=%E2%9C%93&"),0<s.length?f+s:""}),R=function(){function o(e){w(this,o);var t=e.type,r=e.time,n=void 0===r?5e3:r;this.type=t,this.time=n,this.storageType={local:"localStorage",session:"sessionStorage",cookie:"cookie",indexDb:"indexDb",nomal:"nomal"}}return t(o,[{key:"setItem",value:function(e,t){window[this.storageType[this.type]].setItem(e,JSON.stringify({value:t,time:(new Date).getTime()}))}},{key:"getItem",value:function(e){try{var t=JSON.parse(window[this.storageType[this.type]].getItem(e)),r=t.time,n=t.value;return(new Date).getTime()>r+this.time?(window[this.storageType[this.type]].removeItem(e),null):n}catch(e){return null}}}]),o}();function z(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function B(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?z(Object(r),!0).forEach(function(e){l(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):z(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function q(t,e){var r,n=Object.keys(t);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(t),e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)),n}function U(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?q(Object(r),!0).forEach(function(e){l(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):q(Object(r)).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var H=new(function(){function j(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};w(this,j);var t=e.cache,r=void 0===t?"no-cache":t,n=e.credentials,o=void 0===n?"same-origin":n,i=e.headers,a=void 0===i?{}:i,c=e.mode,u=void 0===c?"cors":c,l=e.redirect,s=void 0===l?"follow":l,f=e.referrer,p=void 0===f?"no-referrer":f,y=e.timeOut,d=void 0===y?3e3:y,h=e.BASE_URL,m=void 0===h?"":h,v=e.requestType,b=void 0===v?"JSON":v,g=e.cacheType,O=void 0===g?"":g;this.FetchConfig={cache:r,credentials:o,headers:a,mode:u,redirect:s,referrer:p},this.config={timeOut:d,BASE_URL:m,requestType:b},this.cacheStorage=O?new R({type:O}):"",this.dataOperation={JSON:{headers:{"Content-Type":"application/json"},formatting:function(e){return JSON.stringify(e)}},FormData:{headers:{"Content-Type":"application/x-www-form-urlencoded"},formatting:function(t){var r=new FormData;return Object.keys(t).forEach(function(e){r.append(e,t[e])}),r}}}}return t(j,[{key:"send",value:function(e){var n=e.url,o=e.FetchConfig,t=this.config,i=t.BASE_URL,r=t.timeOut,a=new Promise(function(t,r){fetch(i?"".concat(i,"/").concat(n):n,o).then(function(e){return e.ok?e.json():void r({status:e.status,msg:e.statusText})}).then(function(e){t(e)})}),c=new Promise(function(e,t){setTimeout(function(){t("time out")},r)});return Promise.race([a,c])}},{key:"preSend",value:function(e){var t=e.url,r=e.params,n=e.headers,o=e.method,i=this.config.requestType,a=B(B({},this.FetchConfig),{},{method:o,headers:B(B({},this.dataOperation[i].headers),n)});return r&&(a.body=this.dataOperation[i].formatting(r)),this.send({url:t,FetchConfig:a})}},{key:"get",value:function(e){var t=this,r=e.url,n=e.query,o=e.headers,i=n?"".concat(r,"?").concat(I(n)):r;return this.cacheStorage?this.cacheStorage.getItem(i)?Promise.resolve(this.cacheStorage.getItem(i)):this.preSend({url:i,headers:o,method:"GET"}).then(function(e){return t.cacheStorage.setItem(i,e),e}):this.preSend({url:i,headers:o,method:"GET"})}},{key:"post",value:function(e){var t=e.url,r=e.query,n=e.params,o=void 0===n?{}:n,i=e.headers;return this.preSend({url:r?"".concat(t,"?").concat(I(r)):t,params:o,headers:i,method:"POST"})}}]),j}())({requestType:"JSON",cacheType:"local"});var J,Q,V=new(J=3e3,p=function(e,t,n){return U(U({},n),{},{value:function(e){var t=arguments,r=this;Q=Q||setTimeout(function(){Q=null,n.value.apply(r,u(t))},J)}})},y=function(e,n){switch(e){case"GET":return function(e,t,r){return U(U({},r),{},{value:function(e){var t=arguments;H.get({url:n,query:e}).then(function(e){r.value.apply({result:e},u(t))}).catch(function(e){console.log("err====>",e)})}})};default:return function(e,t,r){}}}("GET","https://api.github.com/users/octocat"),e((d=function(){function e(){w(this,e)}return t(e,[{key:"getOct",value:function(e){console.log(e),console.log("result==>",this.result)}}]),e}()).prototype,"getOct",[p,function(e,t,r){return U(U({},r),{},{value:function(e){try{console.time("consuming"),console.log("发送埋点",e),r.value.apply(this,Array.prototype.slice.call(arguments))}finally{console.timeEnd("consuming")}}})},y],Object.getOwnPropertyDescriptor(d.prototype,"getOct"),d.prototype),d);V.getOct({test:1}),V.getOct({test:1}),V.getOct({test:1}),V.getOct({test:1}),V.getOct({test:1}),V.getOct({test:1})});
