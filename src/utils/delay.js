/**
 * 节流
 * 只要事件不停止，就不会执行
 * */

function throttle(func, delay = 500) {
    return function () {
        // 重复调用会重置定时器
        if (func.timer !== undefined) {
            clearTimeout(func.timer)
        }
        func.timer = setTimeout(() => {
            console.log(4)
            func();
        }, delay);
    }()
}


/**
 * 防抖
 * 在一定时间内，多次调用只有一次有效
 * */
function debounce(fn, time = 500) {
    return function () {
        if (fn.timer !== undefined) {
            return;
        }
        fn.timer = setTimeout(() => {
            fn();
            console.log(4)
            fn.timer = undefined
        }, time)
    }()
}

export {debounce, throttle};