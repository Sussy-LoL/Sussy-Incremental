//by 我总是词不达意 from CSDN
//edited by sussy baka 


/*
 * 获取所有私有属性，包含Symbol私有属性
 */
const utils = (function() {
  const getOwnProperties = obj => {
    if (obj === null) return []
    return [
      ...Object.keys(obj), // 同 ...Object.getOwnPropertyNames(obj) 获取实例的私有属性
      ...Object.getOwnPropertySymbols(obj)
    ]
  };
   
  /*
   * 浅克隆
   */
  const shallowClone = obj => {
    let type = toType(obj)
    if (/^(string|number|boolean|null|undefined|symbol|bigint)$/.test(type)) return obj
    if (/^function$/.test(type)) {
      return function proxy() {
        return obj()
      }
    }
    if (/^date|regexp$/.test(type)) return new obj.constructor(obj)
    if (/^error$/.test(type)) return new obj.constructor(obj.message)
    // 只处理数组（最后返回的是数组）和对象（普通对象/类数组对象等=》最后返回的都是普通对象）
    let keys = getOwnProperties(obj),
      clone = {}
    //clone = new obj.constructor(); // 类数组的时候会有问题
    Array.isArray(obj) ? (clone = []) : null
    keys.forEach(key => {
      clone[key] = obj[key]
    })
    return clone
  };
   
  /*
   * 深克隆
   */
  const deepClone = (obj, cache = new Set()) => {
    // Set是一种存储结构，值的集合，保存非重复项，即Set中的元素是唯一的
    // 只有数组和对象才处理深拷贝，其余的情况直接按照浅克隆处理即可
    let type = toType(obj)
    if (obj instanceof ExpantaNum) return new EN(obj)
    if (!/^(array|object)$/.test(type)) return shallowClone(obj)
   
    // 避免自己套用自己导致无限递归
    if (cache.has(obj)) return shallowClone(obj)
    cache.add(obj)
   
    let keys = getOwnProperties(obj),
      clone = {}
    type === 'array' ? (clone = []) : null
    keys.forEach(key => {
      clone[key] = deepClone(obj[key], cache)
    })
    return clone
  };
   
  /*
   * 实现两个对象的深合并（Object.assign(obj1,obj2)为浅合并）
   *    + obj1对象 obj2对象 -> 依次遍历obj2，把obj2中的每一项替换obj1中的每一项
   *    + obj1对象 obj2不是对象 -> 不进行任何处理
   *    + obj1不是对象 obj2对象 -> obj2直接替换obj1
   *    + obj1不是对象 obj2也不是对象 -> obj2直接替换obj1
   */
  const merge = (obj1, obj2) => {
    let isPlain1 = isPlainObject(obj1),
      isPlain2 = isPlainObject(obj2)
    if (!isPlain1) return obj2
    if (!isPlain2) return obj1
    // 遍历obj2中的每一项，让其替换obj1中的每一项
    let obj2Arr = getOwnProperties(obj2)
    obj2Arr.forEach(key => {
      obj1[key] = merge(obj1[key], obj2[key])
    })
    return obj1
  };
   
  //===========================================================
   
  // 数据类型检测通用方法
  let getProto = Object.getPrototypeOf, // 获取实例的原型对象
    class2type = {},
    toString = class2type.toString, // 取Object.prototype.toString
    hasOwn = class2type.hasOwnProperty, // 取Object.prototype.hasOwnProperty
    fnToString = hasOwn.toString, // 取Function.prototype.toString 转换字符串用
    ObjectFunctionString = fnToString.call(Object); // 同Object.toString() 把Object函数转成字符串 "function Object() {[native code]}"
   
  /*
   * 循环数据中的每一项：建立数据类型检测的映射表
   *    + [object String]/[object Number]/[object Boolean]都是为了处理基于构造函数创建的基本数据值的引用类型值，最后期许检测出来的结果依然是"string/number/boolean"
   *    + typeof new Number(10) => "object"
   *    + toString.call(new Number(10)) => "[object Number]"
   */
  let assembleKeys = [
    'String',
    'Number',
    'Boolean',
    'Symbol',
    'Function',
    'Array',
    'Object',
    'Date',
    'RegExp',
    'Error',
    'GeneratorFunction'
  ];
  assembleKeys.forEach(name => (class2type[`[object ${name}]`] = name.toLowerCase()));
   
  /*
   * 检测数据类型的公共方法
   */
  const toType = obj => {
    // '=='判断null或者undefined，+""转成字符串 "null"或者"undefined"
    if (obj == null) return obj + ''
    // 如果是引用数据类型（包含：new Number(10)这种），则基于Object.prototype.toString检测（拿检测的结果到之前建立的映射表中去匹配查找，找到对象的小写数据类型，找不到则返回"object"）；而基本数据类型，之前排除了null/undefined，剩下的基于typof即可解决
    return typeof obj === 'object' || typeof obj === 'function'
      ? class2type[toString.call(obj)] || 'object'
      : typeof obj
  };
   
  /*
   * 检测是否为一个纯粹对象
   */
  const isPlainObject = obj => {
    let proto = null,
      Ctor,
      type = toType(obj);
    if (obj === undefined) return false
    // 不存在或者检测数据类型的结果都不是object，则一定不是纯粹对象
    if (!obj || type !== 'object') return false;
    // 不存在原型的情况：Object.create(null)，相当于创建空对象{}
    proto = getProto(obj)
    if (!proto) return true;
    // 获取当前值原型对象上的constructor（即获取它的构造函数）
    Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    // 有构造函数，并且构造函数需要直接是Object才可以（这样排除了NodeList等子类/自定义类的实例）
    // ObjectFunctionString === fnToString.call(Object)
    return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString
  };

  const GetLength = obj => {
    let type = toType(obj),len = 0;
    if(obj === undefined || !obj) return 0;
    if(type != 'array') return 1;
    obj.forEach((element) => {
      len += GetLength(element)
    })
    return len;
  }
   
   
  return {
    getOwnProperties,
    shallowClone,
    deepClone,
    toType,
    isPlainObject,
    merge,
    GetLength,
  };
}())