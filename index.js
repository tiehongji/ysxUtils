/* eslint-disable */
/*
 * @Author: tiehongji
 * @Date: 2021-03-11 16:49:29
 * @LastEditTime: 2021-05-29 16:57:10
 * @LastEditors: tiehongji
 * @Description: 工具类
 */
import dayjsPluginUTC from 'dayjs-plugin-utc'
import dayjs from 'dayjs'
import fileSaver from 'file-saver'
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param {Any} arg
 * @returns {Boolean}
 */
export function validate(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1)
}

/**
 * @param {import("aws-sdk/clients/appflow").Object} arg
 * @returns {Boolean}
 */
export function isObject(arg) {
  return validate(arg) === 'Object'
}

/**
 * @description: iosSarfri
 * @param {Any} params -- 日期
 * @return {Any} params -- 转换过的日期
 */
export function iosDateFormat(params) {
  if (isString(params)) {
    params = params.indexOf('-') ? params.replace(/\-/g, '/') : params
  }
  return params
}

dayjs.extend(dayjsPluginUTC)
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Utils {
  constructor() {
    _defineProperty(this, "getLocalFileBase64", file => {
      return new Promise((resolve, reject) => {
        const fileReadr = new FileReader();
        fileReadr.readAsDataURL(file);

        fileReadr.onload = function (params) {
          resolve(params.target.result);
        };

        fileReadr.onerror = function (params) {
          reject(params);
        };
      });
    });

    _defineProperty(this, "numberFormat", value => {
      var param = {};
      var k = 10000,
          sizes = ['', '万', '亿', '万亿'],
          i;

      if (value < k) {
        param.value = value;
        param.unit = '';
      } else {
        i = Math.floor(Math.log(value) / Math.log(k));
        param.value = (value / Math.pow(k, i)).toFixed(0);
        param.unit = sizes[i];
      }

      return `${param.value}${param.unit}`;
    });

    _defineProperty(this, "getImageMsg", (url, crossOrigin = 'anonymous') => {
      return new Promise((resolve, reject) => {
        const ImageMsg = new Image();
        ImageMsg.src = url;
        ImageMsg.crossOrigin = crossOrigin;

        ImageMsg.onload = function () {
          resolve(ImageMsg);
        };

        ImageMsg.onerror = function (params) {
          reject(params);
        };
      });
    });

    _defineProperty(this, "isEmpty", params => {
      if (!params) return new Error('请传入正确的值'); // 没有传入参数处理

      if (Object.prototype.toString.call(params) === '[object Object]') return JSON.stringify(params) === '{}';else if (Object.prototype.toString.call(params) === '[object Array]') return params.length === 0;else return false;
    });

    _defineProperty(this, "getCookie", name => {
      var arr;
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    });

    _defineProperty(this, "getSession", name => {
      return sessionStorage.getItem(name);
    });

    _defineProperty(this, "setSession", (name, value) => {
      sessionStorage.setItem(name, value);
    });

    _defineProperty(this, "setCookie", (name, value) => {
      document.cookie = name + '=' + escape(value);
    });

    _defineProperty(this, "clearCookie", name => {
      this.setCookie(name, '', -1);
    });

    _defineProperty(this, "getQueryString", name => {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    });
  }
  b64toFile(b64Data, filename, contentType) {
    let sliceSize = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    let file = new File(byteArrays, filename, {
      type: contentType
    });
    return file;
  } 
  // 保存文件
  saveFIle(file, fileName) {
    fileSaver.saveAs(file, fileName);
  }
  downloadFile(filename, data) {
    let DownloadLink = document.createElement('a');
    if (DownloadLink) {
      document.body.appendChild(DownloadLink);
      DownloadLink.style = 'display: none';
      DownloadLink.download = filename;
      DownloadLink.href = data;
      DownloadLink.target = "_blank";

      if (document.createEvent) {
        let DownloadEvt = document.createEvent('MouseEvents');
        DownloadEvt.initEvent('click', true, false);
        DownloadLink.dispatchEvent(DownloadEvt);
      } else if (document.createEventObject) DownloadLink.fireEvent('onclick');else if (typeof DownloadLink.onclick == 'function') DownloadLink.onclick();

      document.body.removeChild(DownloadLink);
    }
  }
  /**
   * @description: 
   * @param {String} date1 - 比较的第一个时间
   * @param {String} date2 - 比较的第二个时间
   * @param {String} tiemFormat - 时间格式
   * @param {String} utc - 是否utc要转换本地时间格式
   */
  compareDate(date1, date2 = {
    value: new Date(),
    utc: true,
    format: 'YYYY-MM-DD HH:mm:ss'
  }) {
    let dateValue1 = '';
    let dateValue2 = '';
    const defaultConfig = {
      value: new Date(),
      utc: true,
      format: 'YYYY-MM-DD HH:mm:ss'
    };
    date1 = { ...defaultConfig,
      ...date1
    };
    date2 = { ...defaultConfig,
      ...date2
    };

    if (date1.utc) {
      dateValue1 = this.formatUtc(date1.value, date1.format).replace(/\-/g, '/');
    } else {
      dateValue1 = this.setTimeFormat(date1.value, date1.format, false).replace(/\-/g, '/');
    }

    if (date2.utc) {
      dateValue2 = this.formatUtc(date2.value, date2.format).replace(/\-/g, '/');
    } else {
      dateValue2 = this.setTimeFormat(date2.value, date2.format, false).replace(/\-/g, '/');
    }

    return new Date(dateValue1).getTime() - 1 < new Date(dateValue2).getTime() || new Date(dateValue1).getTime() === new Date(dateValue2).getTime();
  }
  /**
   * @description: 时间格式处理
   * @param {String} time -- 待处理的时间
   * @param {String} tiemFormat -- 时间格式
   * YYYY	2015	4 digit year
      M MM	0..12	Month number
      D DD	0..31	Day of month
      H HH	0..23	24 hour time
      h hh	1..12	12 hour time used with a A.
      a A	am pm	Post or ante meridiem
      m mm	0..59	Minutes
      s ss	0..59	Seconds
   */
  setTimeFormat(time, tiemFormat = 'YYYY-MM-DD', utc = true) {
    tiemFormat = tiemFormat.split(' ').reduce((str, item, index) => {
      if (index === 0) {
        str = item.toUpperCase() + ' ';
      } else {
        str += item + ' ';
      }

      return str;
    }, '');
    time = iosDateFormat(time);

    if (utc) {
      return dayjs(time).utc().format(tiemFormat);
    } else {
      return dayjs(time).format(tiemFormat);
    }
  } 
  // utc转本地
  formatUtc(time, tiemFormat = 'YYYY-MM-DD') {
    tiemFormat = tiemFormat.split(' ').reduce((str, item, index) => {
      if (index === 0) {
        str = item.toUpperCase() + ' ';
      } else {
        str += item + ' ';
      }

      return str;
    }, '');
    time = iosDateFormat(time);
    return dayjs.utc(time, tiemFormat).local().format(tiemFormat); //dayjs.utc(time).local().format(tiemFormat) //2019-03-06T17:11:55+08:00 dayjs(data.time).add(8, 'hour').format(tiemFormat)
  }
  /**
   * @description: 获取本地图片base64
   * @param {Object} file blob [input:file].files[0]
   * @return { String }  base64
   */
    getLocalFileBase64 = file => {
      return new Promise((resolve, reject) => {
          const fileReadr = new FileReader()
          fileReadr.readAsDataURL(file)
          fileReadr.onload = function(params) {
              resolve(params.target.result)
          }
          fileReadr.onerror = function(params) {
              reject(params)
          }
      })
  }
  /**
   * @description: canvas方式获取网络图片base64
   * @param {*} img 图片对象 即  ImageMsg
   * @param {*} width 图片宽
   * @param {*} height 图片高
   */
  getBase64Image(img, width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width || img.width;
    canvas.height = height || img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL(); // base64
    return dataURL;
  }
  /**
   * @description: 判空
   * @param {any} params 需要判空的数据
   * @return {Boolean} 结果
   */
   isEmpty = params => {
    if (!params) return new Error('请传入正确的值') // 没有传入参数处理
    if (Object.prototype.toString.call(params) === '[object Object]') return JSON.stringify(params) === '{}'
    else if (Object.prototype.toString.call(params) === '[object Array]') return params.length === 0
    else return false
    }
  /**
   * @description: 数组对象去重
   * @param {Array} obj 需要去重的数组对象
   * @param { String } key 去重的依靠值
   * @return {Array} 去重后的数组
   */
  arrayReport(obj, key) {
    const exits = {};
    if (isArray(obj)) {
      const noReport = obj.reduce((cur, next) => {
        !exits[next] && (exits[next] = true && cur.push(next));
        return cur;
      }, []);
      return noReport;
    } else if (isObject(obj)) {
      const noReport = obj.reduce((cur, next) => {
        !exits[next[key]] && (exits[next[key]] = true && cur.push(next));
        return cur;
      }, []);
      return noReport;
    }
  }
  /**
   * @description: 数组 || 或者数组对象判断重复 
   * @param {Array} obj 需要去重的数组对象
   * @param { String } key 去重的依靠值
   * @return {Array} 去重后的数组
   */

  isReport(obj, key) {
    const exits = {};
    if (isArray(obj)) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];

          if (!exits[element]) {
            exits[element] = true;
          } else {
            return true;
          }
        }
      }
    } else if (isObject(obj)) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
          const element = obj[key];

          if (!exits[element[key]]) {
            exits[element[key]] = true;
          } else {
            return true;
          }
        }
      }
    }
  }

  // 数组扁平化 arr 多维数组
  Arrayflat(arr) {
    const currentArr = [];
    arr.forEach(element => {
      if (Array.isArray(element)) {
        currentArr.push(...this.Arrayflat(element));
      } else {
        currentArr.push(element);
      }
    });
    return currentArr;
  } 
  // 深拷贝
  cloneObject(data) {
    try {
      let returnObj = {};
      isArray(data) && (returnObj = []);
      isObject(data) && (returnObj = {});
      if (!isArray(data) && !isObject(data)) return;

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];

          if (typeof element === 'object') {
            returnObj[key] = this.cloneObject(element);
          } else {
            returnObj[key] = element;
          }
        }
      }

      return returnObj;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @description: 单位转换 KB, M, G
   * @param { Number} data - 文件大小 字节
   * @return {String } 转换后的结果
   */
  unitFormat(data, toUpperCase = true) {
    let unit = ['b', 'kb', 'mb', 'gb'];
    let returnData = 0;

    if (toUpperCase) {
      unit = unit.map(item => item.toUpperCase());
    }

    if (isNaN(Number(data)) || !data) {
      return '';
    } // b


    if (data < 1024) {
      returnData = data + unit[0];
    } // kb


    if (data / 1024 >= 1) {
      returnData = (data / 1024).toFixed(2) + unit[1];
    } // mb


    if (data / (1024 * 1024) >= 1) {
      returnData = (data / (1024 * 1024)).toFixed(2) + unit[2];
    } // gb


    if (data / (1024 * 1024) >= 1) {
      returnData = (data / (1024 * 1024)).toFixed(2) + unit[2];
    }

    return returnData;
  }

}
export default new Utils()