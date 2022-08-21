/**
 *
 * 深度对象判断
 *
 * @param a
 * @param b
 * @param noProp
 * @returns
 */
export function isEquality(a: any, b: any, ...noProp: string[]) {
    if (a && b) {
        let typeA = Object.prototype.toString.call(a);
        let typeB = Object.prototype.toString.call(b);
        if (typeA == typeB) {
            switch (typeA) {
                case '[object Object]':
                    let keyA = Object.keys(a).filter(i => !noProp.includes(i));
                    let keyB = Object.keys(b).filter(i => !noProp.includes(i));
                    if (keyA.length != keyB.length) {
                        return false;
                    }
                    for (let i of keyA) {
                        if (!isEquality(a[i], b[i], ...noProp)) {
                            return false;
                        }
                    }
                    return true;
                case '[object Array]':
                    if (a.length != b.length) {
                        return false;
                    }
                    for (let i = 0; i < a.length; i++) {
                        if (!isEquality(a[i], b[i], ...noProp)) {
                            return false;
                        }
                    }
                    return true;
                default:
                    return a == b;
            }
        }
        return false;
    }
    return a == b;
}

/**
 * 链式获取对象
 * @example
 * ```ts
 * let o = {a: {b: {c: 123}}}
 * getDeepObj(o, 'a.b.c') // 123
 * ```
 *
 * @param data
 * @param d
 * @param split
 * @returns
 */
export function getDeepObj(data: any, d: string, split = '.') {
    if (!data || !d) return undefined;
    let dArr = d.split(split);
    let r = data;
    for (let i = 0; i < dArr.length; i++) {
        r = r[dArr[i]];
        if (!r) {
            return r;
        }
    }
    return r;
}


/**
 * 获取四位随机数
 */
export function s4(): string {
    return ((Math.random() * (0xFFFF - 0x1000) + 0x1000) | 0).toString(16)
}
