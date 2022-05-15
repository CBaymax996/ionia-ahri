import {ElMessage} from "element-plus";

/**
 * 处理请求结果
 * @param res 异步请求结果
 * @param table ref 表格数据 table.value
 * @param page ref 分页对象
 */
function updateTableAndPage(res, table, page) {
    let data = res.data;
    if (data.success === true) {
        table.value = data.data.content
        page.value.index = data.data.number + 1
        page.value.total = data.data['totalPages']
    } else {
        ElMessage({message: "数据获取失败，" + data.message, type: "error"})
    }
}


/**
 * 将Map对象映射为List
 * @param map
 * @param attribute{string}如果指定属性，会将对应属性输出为List，否则将对象拼装为list
 * @returns {null|[]}
 */
const mapToList = function (map, attribute = null) {
    if (map === undefined) {
        return null
    }
    let res = []
    Object.keys(map).forEach(k => {
        if (attribute === null) {
            res.push(map[k])
        } else {
            res.push(map[k][attribute])
        }

    })
    return res;
}

/**
 * 根据Method返回不同的element提示类型
 * @param {string}method post|get|update|delete
 * @returns {string}element info type string
 */
function getTagType(method) {
    if (method === 'get') {
        return 'success'
    }
    if (method === 'post') {
        return ''
    }
    if (method === 'update') {
        return 'warning'
    }
    return 'danger'
}


/**
 *
 * @param formData no ref
 * @param key 要增加的属性名
 */
function addFormSubParam(formData, key) {
    formData[key].push({})
}

/**
 *
 * @param formData no ref
 * @param key{string} 要删除的属性名
 * @param index {number} 删除的位置索引
 */
function deleteFormSubParam(formData, key, index) {
    formData[key].splice(index, 1)
}


export {mapToList, updateTableAndPage, getTagType, addFormSubParam, deleteFormSubParam}