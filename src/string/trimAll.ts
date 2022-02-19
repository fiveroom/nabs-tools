
/**
 * @example
 * ```
 * trimObjectDeep({a: ' dsaf  ', b: 'dddd ', c: ['f ']})
 * // {a: 'dsaf', b: 'dddd', c: ['f']}
 * ```
 *  */
export function trimObjectDeep(data: any): any {
    let v = data;
    const t = Object.prototype.toString.call(v);
    switch (t) {
        case '[object Array]':
            return v.map((i) => trimObjectDeep(i));
        case '[object Object]':
            Object.keys(v).forEach((i) => {
                v[i] = trimObjectDeep(v[i]);
            });
            return v;
        case '[object String]':
            try {
                let obj = JSON.parse(v);
                return JSON.stringify(trimObjectDeep(obj));
            } catch (e) {
                return v.trim();
            }
        default:
            return v;
    }
}
