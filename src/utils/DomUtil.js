/**
 * 判断domMask是否覆盖domNode
 * @param domMask vue this.$refs获取到的对象
 * @param domNode
 * @return {boolean}
 */
export const isOverlap = function (domMask, domNode) {
    // Node定位
    let left = domNode.getBoundingClientRect().left;
    let right = domNode.getBoundingClientRect().width + left;
    let top = domNode.getBoundingClientRect().top;
    let bottom = domNode.getBoundingClientRect().height + top;
    // Mask定位
    let leftM = domMask.getBoundingClientRect().left;
    let rightM = domMask.getBoundingClientRect().width + leftM;
    let topM = domMask.getBoundingClientRect().top;
    let bottomM = domMask.getBoundingClientRect().height + topM;
    //判断每个块是否被遮罩盖住（即选中）
    let leftFlag = leftM <= left && left <= rightM;
    let rightFlag = leftM <= right && right <= rightM;
    let topFlag = topM <= top && top <= bottomM;
    let bottomFlag = topM <= bottom && bottom <= bottomM
    return (leftFlag || rightFlag) && (topFlag || bottomFlag)
}
