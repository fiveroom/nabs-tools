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

/**
 * 删除节点
 * @example
 * ```typescript
 * delTreeNoneNode(new Set(['1', '2']), treeData, 'guid', 'children');
 * ```
 *
 * @param ids
 * @param tree
 * @param cfg `idProp, childrenProp` 别名
 * @returns
 */
export function delTreeNoneNode(
    ids: Set<string>,
    tree: any[],
    ...cfg: string[]
) {
    let stu = false;
    if (Array.isArray(tree) && tree.length) {
        for (let i = tree.length - 1; i >= 0; i--) {
            let data = tree[i];
            let childHas = delTreeNoneNode.apply(null, [
                ids,
                data[cfg[1] || 'children'],
                ...cfg,
            ]);
            if (!childHas && !ids.has(data[cfg[0] || 'id'])) {
                tree.splice(i, 1);
            } else {
                stu = true;
            }
        }
    }
    return stu;
}

interface optionLeafPropCfg {
    field?: string;
    children?: string;
    addSearch?: string;
}

/**
 *
 * @param arr
 * @param excludeProp
 * @param propCfg
 * @returns
 */
export function getOptionLeaf(
    arr: Object[],
    excludeProp: string[] = [],
    propCfg: optionLeafPropCfg = {}
) {
    let props: optionLeafPropCfg = Object.assign(
        {field: 'Field', children: 'children', addSearch: 'addSearch'},
        propCfg
    );
    let res = [];
    const getChild = function () {
        for (let i = 0; i < arr.length; i++) {
            let d = arr[i];
            if (d[props.addSearch] && !excludeProp.includes(d[props.field])) {
                res.push(d);
            }
            if (d[props.children]) {
                this.getChild(d[props.children]);
            }
        }
    };
    getChild();
    return res;
}

interface getTreeNodeByIdOption {
    id?: string;
    children?: string;
}

/**
 * 获取树节点和其节点树
 * @param id
 * @param data
 * @param option
 * @returns
 */
export function getTreeNodeById<T>(
    id: string | number,
    data: T[],
    option?: getTreeNodeByIdOption
): {
    zIndexArr: { d: T; i: number }[];
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
    callBack?: (data: T) => void;
}


/**
 * 列表转树
 * @returns 树
 * @param data
 * @param config
 */
export function listToTree<T = any>(data: T[], config?: listToTreeOption<T>): T[] {
    config = Object.assign({children: 'children', parent: 'ParentGuid', id: 'Guid'}, config);
    const cProp = config.children;
    const cacheChildren: { [prop: string]: T[] } = {};
    const result: T[] = [];
    const cacheObj: { [prop: string]: T } = {};
    for (let item of data) {
        if (!item) {
            continue;
        }
        item[cProp] = [];
        const id = item[config.id];
        config.callBack && config.callBack(item);
        cacheObj[id] = item;
        const parentId = item[config.parent];
        if (!parentId) {
            result.push(item);
        } else if (cacheObj[parentId]) {
            cacheObj[parentId][cProp].push(item);
        } else {
            cacheChildren[parentId] ??= [];
            cacheChildren[parentId].push(item);
        }
    }
    Object.keys(cacheChildren).forEach(id => {
        cacheObj[id] && cacheObj[id][cProp].unshift(...cacheChildren[id]);
    });
    return result;
}


/**
 * 树深度排序
 * @param data
 * @param sortFun
 * @param id
 * @param child
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
    (item: T, option: {
         parent: T,
         deep: number,
         brother: T[],
         zIndexArr: number[]
     }
    ): void;
}

/**
 *
 * @param data
 * @param callback
 * @param childrenProp
 *
 * @return 返回树的深度
 */
export function treeHelper<T = any>(data: T[], callback: TreeHelperCallback<T>, childrenProp = 'children'): number {
    if(typeof callback !== 'function'){
        throw TypeError('callback is not a function')
    }
    if(!childrenProp || typeof childrenProp !== 'string'){
        throw TypeError('childrenProp is not a string or is null')
    }
    let deepSum = 0;
    // const result = [];
    const fun = (data, parent = null, deep = 0, index = 0, zIndexArr = []) => {
        if (Array.isArray(data) && data.length) {
            deepSum = Math.max(deepSum, deep);
            data.forEach((item, i) => {
                zIndexArr.push(i);
                index++;
                callback &&
                callback(item, {
                    parent,
                    deep,
                    brother: data,
                    zIndexArr: [...zIndexArr]
                });
                fun(item[childrenProp], item, deep + 1, index, zIndexArr);
                zIndexArr.pop();
            }, 0);
        }
    };
    fun(data);
    return deepSum;
}
