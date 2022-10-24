import { getDeepObj } from './core';

/**
 * 以节点id作为键，生成一个对象返回
 * @param data
 * @param id
 * @param child
 * @returns
 */
export function treeToMap<T extends Object>(
    data: T[],
    id: string,
    child: string = 'children'
): { [prop: string]: T } {
    let r = {};
    let dealFunc = (d: Object[]) => {
        if (Array.isArray(d)) {
            d.forEach(i => {
                r[i[id]] = i;
                dealFunc(getDeepObj(i, child));
            });
        }
    };
    dealFunc(data);
    return r;
}


interface getTreeNodeByIdOption {
    id?: string;
    children?: string;
}

/**
 * 获取树节点和其节点树
 * @param id
 * @param data
 * @param option 默认 {id: 'id', children: 'children'}
 * @returns
 */
export function getTreeNodeById<T>(
    id: string | number,
    data: T[],
    option?: getTreeNodeByIdOption
): {
    zIndexArr: { d: T; i: number; b: T[] }[];
    data: T;
} {
    let prop = {
        id: 'id',
        children: 'children',
    };
    Object.assign(prop, option || {});
    let s = {
        zIndexArr: [],
        data: null,
    };
    let findNode = (data: T[]) => {
        if (!Array.isArray(data)) return false;
        for (let i = 0; i < data.length; i++) {
            let d = data[i];
            s.zIndexArr.push({
                d,
                i,
                b: data,
            });
            if (d[prop.id] === id) {
                s.data = d;
                return true;
            }
            if (findNode(getDeepObj(d, prop.children))) {
                return true;
            }
            s.zIndexArr.pop();
        }
        return false;
    };
    findNode(data);
    return s;
}

export interface listToTreeOption<T> {
    children?: string;
    id?: string;
    parent?: string;
    callBack?: (data: T) => any;
    applyNoneParent?: boolean
}

/**
 * 列表转树
 * @param data
 * @param config 默认
 * {"children": "children", "parent": "ParentGuid", "id": "Guid", "applyNoneParent": false}
 * @returns 树
 */
export function listToTree<T = any>(
    data: T[],
    config?: listToTreeOption<T>
): any[] {
    config = Object.assign(
        { children: 'children', parent: 'ParentGuid', id: 'Guid', applyNoneParent: false },
        config
    );
    const cProp = config.children;
    const cacheChildren: Map<string, {lastParentIndex: number, list: T[]}> = new Map();
    let lastParentIndex = -1;
    const result: any[] = [];
    const cacheObj: { [prop: string]: T } = {};
    for (let item of data) {
        if (!item) {
            continue;
        }
        if (config.callBack) {
            let data = config.callBack(item);
            if (data) {
                item = data;
            }
        }
        item[cProp] = [];
        const id = item[config.id];
        cacheObj[id] = item;
        const parentId = item[config.parent];
        if (!parentId) {
            lastParentIndex = result.push(item) - 1;
        } else if (cacheObj[parentId]) {
            cacheObj[parentId][cProp].push(item);
        } else {
            if (!cacheChildren.has(parentId)) {
                cacheChildren.set(parentId, {list: [], lastParentIndex: lastParentIndex});
            }
            cacheChildren.get(parentId).list.push(item);
        }
    }
    const keys = Array.from(cacheChildren.keys());
    for (let i = keys.length - 1; i >= 0; i--) {
        const id = keys[i];
        const node = cacheChildren.get(keys[i]);
        if(cacheObj[id]){
            cacheObj[id][cProp].unshift(...node.list)
        } else if(config.applyNoneParent){
            result.splice(node.lastParentIndex + 1, 0, ...node.list)
        }
    }
    return result;
}

/**
 * 树深度排序
 * @param data
 * @param sortFun
 * @param id 默认 id
 * @param child 默认 children
 * @returns
 */
export function treeSortDeep<T>(
    data: T[],
    sortFun?: (a: T, b: T) => number,
    id: string = 'id',
    child: string = 'children'
): T[] {
    if (Array.isArray(data)) {
        data.forEach(i => {
            if (Array.isArray(i[child])) {
                i[child] = treeSortDeep(i[child], sortFun, id, child);
            }
        });
        return data.sort((a, b) => {
            if (sortFun) {
                return sortFun(a, b);
            }
            return a[id] - b[id];
        });
    }
    return data;
}

/**
 * 树的宽度
 * @param data
 * @param child
 * @returns
 */
export function treeWidth<T>(data: T[], child: string = 'children'): number {
    let l = 0;
    if (Array.isArray(data)) {
        data.forEach(i => {
            l += treeWidth(i[child]);
        });
        l += data.length;
    }
    return l;
}

export interface TreeHelperCallback<T = any> {
    (
        item: T,
        option: {
            parent: T;
            deep: number;
            zIndexArr: number[];
        }
    ): void;
}

export interface TreeHelperTop<T = any> {
    (
        item: T,
        option: {
            parent: T;
            deep: number;
            zIndexArr: number[];
        }
    ): boolean;
}

// 遍历方式
export enum LookupWay {
    前序遍历,
    后序遍历,
}

export interface ExtraOption<T> {
    childrenProp?: string;
    lookupWay?: LookupWay;
    // reverseCall?: TreeHelperCallback<T>,
    whenStop?: TreeHelperTop<T>;
}

export type TreeHelperOption<T> = string | ExtraOption<T>;

/**
 * 树循环帮助函数，子项属性默认为 `children`
 *
 * @param data
 * @param callback
 * @param treeHelperOption
 *
 * @return {number} 返回树的深度
 */
export function treeHelper<T = any>(
    data: T[],
    callback: TreeHelperCallback<T>,
    treeHelperOption: TreeHelperOption<T> = 'children'
): number {
    if (typeof callback !== 'function') {
        throw TypeError('callback is not a function');
    }
    let o: ExtraOption<T> = {
        childrenProp: 'children',
        lookupWay: LookupWay.前序遍历,
    };
    if (typeof treeHelperOption !== 'string') {
        Object.assign(o, treeHelperOption);
    } else {
        o.childrenProp = treeHelperOption;
    }
    // const reverseCall = o.reverseCall;
    const whenStop = o.whenStop;

    let deepSum = 0;

    const fun = (data, parent = null, deep = 0, zIndexArr = []) => {
        if (Array.isArray(data) && data.length) {
            deepSum = Math.max(deepSum, deep);
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                zIndexArr.push(i);
                const context = { parent, deep, zIndexArr: [...zIndexArr] };
                let stop;
                switch (o.lookupWay) {
                    case LookupWay.前序遍历:
                        callback(item, context);
                        stop = fun(
                            item[o.childrenProp],
                            item,
                            deep + 1,
                            zIndexArr
                        );
                        break;
                    default:
                        stop = fun(
                            item[o.childrenProp],
                            item,
                            deep + 1,
                            zIndexArr
                        );
                        callback(item, context);
                        break;
                }
                // reverseCall && reverseCall(item, context);
                if (stop || (whenStop && whenStop(item, context))) {
                    return true;
                }
                zIndexArr.pop();
            }
        }
        return false;
    };
    fun(data);
    return deepSum;
}
