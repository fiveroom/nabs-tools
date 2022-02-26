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
        { field: 'Field', children: 'children', addSearch: 'addSearch' },
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

interface listToTreeOption {
    idProp: string;
    parentIdProp: string;
    childrenProp: string;
}

/**
 * 列表转树
 * @param dataList 数据源
 * @param option 配置项
 * @returns 树和深度 `{data: [...], deep: 2}`
 */
export function listToTree(dataList: any[], option: listToTreeOption) {
    let res = [];
    let data = {};
    let deep = 0;
    if (!dataList?.length) {
        return { data: res, deep: -1 };
    }
    for (let i = dataList.length - 1; i >= 0; i--) {
        let item = dataList[i];
        item[option.childrenProp] = [];
        item._level_ = 0;
        item._expand_ = true;
        data[item[option.idProp]] = { obj: item, zIndex: 0 };
        if (!item[option.parentIdProp]) {
            dataList.splice(i, 1);
            res.unshift(item);
        }
    }
    for (let i = 0; i < dataList.length; i++) {
        let item = dataList[i];
        let currParent = data[item[option.parentIdProp]];
        let parent = currParent;
        while (parent) {
            item._level_++;
            parent = data[parent.obj[option.parentIdProp]];
            if (parent && parent.obj._level_ != 0) {
                item._level_ += parent.obj._level_ + 1;
                break;
            }
        }
        deep = Math.max(deep, item._level_);
        if (currParent) {
            currParent.obj[option.childrenProp].push(item);
        }
    }
    return { data: res, deep };
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
