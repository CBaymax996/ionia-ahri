/**
 * 获取某个字符串的Hash值
 * @param str
 * @param len 最终Hash的长度
 * @return {number}
 */
export const getHash = function (str, len = 16) {
    //1.定义hashCode变量
    let hashCode = 0

    //2.霍纳算法，来计算 hashCode的值
    for (let i = 0; i < str.length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i) //获取编码
    }

    //3.取余状态
    return hashCode % len
}

