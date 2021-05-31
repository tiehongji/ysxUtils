<!--
 * @Author: tiehongji
 * @Date: 2021-05-29 16:58:55
 * @LastEditTime: 2021-05-29 17:42:53
 * @LastEditors: tiehongji
 * @Description: 说明
-->

> 单一工具函数导出
+ 验证类型函数\
  validate 函数使用object.prototype.toString.call()进行类型判断更为准\
  返回值为object, Array,String,Number,Boolean,Function,Undefined,Null,Symbol等类型
  ```js
  import { validate } from 'ysx-utils'
  validate(0) // Number
  ```
+ 对象类型判断 
    ```js
  import { isObject } from 'ysx-utils'
  isObject({}) // true
  ```
+ 数组判断 
    ```js
  import { isArray } from 'ysx-utils'
  isArray([]) // true
  ```
+  safari 浏览器下日期格式兼容
    ```js
    import { iosDateFormat } from 'ysx-utils'
    iosDateFormat('2021-05-29') // 2021/05/29
    ```
+  字符串类型判断
    ```js
    import { isString } from 'ysx-utils'
    isString('isString') // true
    ```
> utils工具类方法
+ 文件下载创建a标签（downloadFile）
    ```js
    import YsxUtils from 'ysx-utils'
    YsxUtils.downloadFile('文件名称','文件数据')
    ```
+ 时间大小比较 （compareDate）\
  介绍：接收两个参数 currentDate 与 compareDate 比较currentDate是否小于等于compareDate，\
          currentDate与compareDate为对象类型{value，utc，format} utc(传入时间是否是utc格式) 默认值为true，format（默认值YYYY-MM-DD HH:mm:ss）日期格式
    ```js
    import YsxUtils from 'ysx-utils'
    YsxUtils.compareDate({ value:  new Date(), utc: false, format: 'YYYY-MM-DD HH:mm:ss' },{ value:  new Date(), utc: false, format: 'YYYY-MM-DD HH:mm:ss' }) // true
    ```
+ 时间格式处理 （setTimeFormat）
    ```js
    import YsxUtils from 'ysx-utils'
    /**
   * @description: 时间格式处理，默认转换为utc格式
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
      @param {Boolean} utc -- 待处理的时间
   */
    YsxUtils.setTimeFormat(new Date(),'YYYY-MM-DD', true ) '2020-05-29'
    ```
+  utc时间转本地时间 （formatUtc）
    ```js
    import YsxUtils from 'ysx-utils'
    /**
   * @description: utc时间转本地时间
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
    YsxUtils.formatUtc(new Date(),'YYYY-MM-DD')
    ```
+ 本地上传图片获取base64（getLocalFileBase64）
  ```js
    import YsxUtils from 'ysx-utils'
    /**
   * @description: 获取本地图片base64
    * @param {Object} file blob [input:file].files[0]
    * @return { String }  base64
    */
    YsxUtils.getLocalFileBase64(file) // base64
  ```
+ 获取图片对象 (getImageMsg)
  ```js
    import YsxUtils from 'ysx-utils'
    /**
     * @description: 获取图片对象
     * @param { String } url -- 图片地址
     * @param { String } crossOrigin -- 图片请求跨域设置 anonymous  use-credentials(加了cros的验证)
     * @return { Object } -- Image 对象
     */
    YsxUtils.getImageMsg(url, crossOrigin) // base64
  ```
+ canvas方式获取网络图片base64 (getBase64Image)
  ```js
    /**
     * @description: canvas方式获取网络图片base64
     * @param {*} img 图片对象 即  ImageMsg
     * @param {*} width 图片宽
     * @param {*} height 图片高
     */
    YsxUtils.getBase64Image(img, width, height) // base64
  ```
+ 对象，数组 判空 (isEmpty)
  ```js
    /**
     * @description: 判空
     * @param {any} params 需要判空的数据
     * @return {Boolean} 结果
     */
    YsxUtils.isEmpty([]) // true
  ```
+ 数组对象去重(arrayReport)
  ```js
    /**
     * @description: 数组对象去重
     * @param {Array} obj 需要去重的数组对象
     * @param { String } key 对象去重的依靠值 数据格式为对象时，必须
     * @return {Array} 去重后的数组
     */
    YsxUtils.arrayReport([])
  ```
+  数组 || 或者数组对象判断重复 （isReport）
  ```js
    /**
     * @description: 数组 || 或者数组对象判断重复 
     * @param {Array} obj 需要去重的数组对象
     * @param { String } key 去重的依靠值
     * @return {Array} 去重后的数组
     */
    YsxUtils.isReport([])
  ```
+  获取url参数(getQueryString)
  ```js
    /**
     * 获取url参数
     * @param       {string}     name[key]
     * @return      {string}     name->value
     * */
    YsxUtils.getQueryString(需要获取的参数名称)
  ```
+  数组扁平化 arr 多维数组(Arrayflat)
  ```js
    /**
     * 数组扁平化 arr 多维数组
     * @param  {Array}     [[],[[],[]]]
     * */
    YsxUtils.Arrayflat([[],[[],[]]])
  ```
+  深拷贝(cloneObject)
  ```js
    /**
     * 数组扁平化 arr 多维数组
     * @param  {Array || Object} [],{}
     * */
    YsxUtils.cloneObject(param)
  ```
+  单位转换 'b'， KB, M, G(unitFormat)
  ```js
    /**
     * @description: 单位转换 'b'， KB, M, G
     * @param { Number} data - 文件大小 字节
     * @param {Boolean } toUpperCase  - 大小写转换
     */
    YsxUtils.unitFormat(data, toUpperCase = true)
  ```