import {getHash} from "~/utils/StringUtil";

/**
 * HSL转RBG
 * @param h 色相 [0-360]
 * @param s 饱和度 [0-1]
 * @param l 亮度 [0-1]
 * @returns {[number, number, number]}   r g b  [0-256]
 */
export const hslToRgb = function (h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic

    } else {
        let color = function (p, q, tc) {
            if (tc < 0) {
                tc += 1;
            }
            if (tc > 1) {
                tc -= 1
            }
            if (tc < 1 / 6) {
                return p + ((q - p) * 6 * tc);
            } else if (tc >= 1 / 6 && tc < 1 / 2) {
                return q;
            } else if (tc >= 1 / 2 && tc < 2 / 3) {
                return p + ((q - p) * 6 * (2 / 3 - tc));
            }
            return p;
        }
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        let hk = h / 360;

        r = color(p, q, hk + 1 / 3);
        g = color(p, q, hk);
        b = color(p, q, hk - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


/**
 * RGB转16进制字符串
 *
 * @param rgb [255,255,255]
 * @return String "#ffffff"
 */
export const rgbToHex = function (rgb) {
    if (rgb.length !== 3) {
        return null
    }
    let r = parseInt(rgb[0]);
    let g = parseInt(rgb[1]);
    let b = parseInt(rgb[2]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * 为字符串指定特定颜色
 * @param str
 * @returns String 返回"#FFFFFF"格式颜色
 */
export const colorForStr = function (str) {
    let h = getHash(str, 360)
    let RGBs = hslToRgb(h, 0.5, 0.5);
    return rgbToHex(RGBs);
}
