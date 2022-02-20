export * from './tableHeadTool'
export * from './download'

export function isEquality(a: any, b: any, ...noProp: string[]) {
    if (a && b) {
        let typeA = Object.prototype.toString.call(a);
        let typeB = Object.prototype.toString.call(b);
        if (typeA == typeB) {
            switch (typeA) {
                case '[object Object]':
                    let keyA = Object.keys(a).filter(
                        (i) => !noProp.includes(i)
                    );
                    let keyB = Object.keys(b).filter(
                        (i) => !noProp.includes(i)
                    );
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

