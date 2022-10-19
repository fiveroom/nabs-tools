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
    if (!data || !d) return;
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
    return ((Math.random() * (0xffff - 0x1000) + 0x1000) | 0).toString(16);
}
