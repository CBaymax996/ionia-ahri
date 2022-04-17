/**
 * 将List中对应indexes位置的元素合并
 * 例如：list: ["我","爱","Java","Script"] indexes:[2,3]
 *      -> return: ["我","爱","JavaScript"]
 *
 * @param list 待合并的List
 * @param indexes 指定的索引位置
 * @return {Array} 【非原地操作】返回一个全新的数组，不改变原有对象
 */
export const mergeList = function (list, indexes) {
    if (!(list instanceof Array)) {
        return null;
    }

    let res = [];
    let j = 0;
    let tempStr = [];
    let isInProcess = false;
    for (let i = 0; i < list.length; i++) {
        // case 1
        if (i !== indexes[j] && !isInProcess) {
            res.push(list[i]);
            continue;
        }
        if (isInProcess) {
            // case 3
            if (i === indexes[j]) {
                tempStr.push(list[indexes[j]]);
            } else { // case 4
                res.push(tempStr.join(""), list[i])
                isInProcess = false;
            }

        } else { // case 2
            isInProcess = true;
            tempStr = [];
            tempStr.push(list[indexes[j]]);
        }
        j++;


    }
    if (isInProcess) {
        res.push(tempStr.join(""))
    }
    return res;
}