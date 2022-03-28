export interface tableHead {
    children?: tableHead[];
    _colSpan?: number;
    _rowSpan?: number;
    _deep?: number;
    _isRight?: boolean;
    _isLeft?: boolean;
    _numOfChildren?: number;
    show?: boolean;

    [prop: string]: any;
}

export interface handleColSpanOption<T> {
    deep: number;
    callBack: (head: T, childLen: number) => void;
}

/**
 * 计算表格头部的列合并
 * @param headArr
 * @param param1
 * @returns 总列数
 */
export function handleColSpan<T extends tableHead>(
    headArr: T[],
    {deep = 0, callBack = null}: Partial<handleColSpanOption<T>> = {}
): number {
    if (Array.isArray(headArr)) {
        deep++;
        return headArr.reduce((prev, curr) => {
            let numOfChildren = 0;
            if (!Reflect.has(curr, 'show')) {
                curr.show = true;
            }
            if (curr.show) {
                numOfChildren =
                    handleColSpan(curr.children, {
                        deep,
                        callBack,
                    });
                const colSpan = numOfChildren || 1;
                Object.defineProperty(curr, '_colSpan', {
                    writable: true,
                    value: colSpan,
                });
                Object.defineProperty(curr, '_deep', {
                    writable: true,
                    value: deep,
                });
                callBack && callBack(curr, numOfChildren);
                prev += colSpan;
            }
            Object.defineProperty(curr, '_numOfChildren', {
                writable: true,
                value: numOfChildren
            });
            return prev;
        }, 0);
    }
    return 0;
}

/**
 * 计算表格数的行合并
 *
 * @param headArr
 * @param maxDeep headArr的最大深度
 */
export function handleRowSpan(headArr: tableHead[], maxDeep = 0) {
    headArr.forEach(head => {
        if (head.show) {
            if (head._numOfChildren) handleRowSpan(head.children, maxDeep);
            Object.defineProperty(head, '_rowSpan', {
                writable: true,
                value: head._numOfChildren ? 1 : maxDeep - head['_deep'] + 1,
            });
        }
    });
}


/**
 * 寻找右边边界元素
 *
 * @param headArr
 */
export function handleBorderRight(headArr: tableHead[]) {
    if (Array.isArray(headArr) && headArr.length > 0) {
        for (let i = headArr.length - 1; i >= 0; i--) {
            const head = headArr[i];
            if (!head.show) continue;
            if (head._numOfChildren) handleBorderRight(head.children);
            Object.defineProperty(head, '_isRight', {
                writable: true,
                value: true
            });
            break;
        }
    }
}


/**
 * 计算表格头部的行和列合并
 *
 * @param headArr
 * @returns
 */
export function handleSpan<T extends tableHead>(headArr: T[]) {
    let maxDeep = 0,
        bottomHeads: T[] = [];
    handleColSpan<T>(headArr, {
        callBack: head => {
            if (!Array.isArray(head.children) || !head.children.length) {
                maxDeep = Math.max(maxDeep, head['_deep']);
                bottomHeads.push(head);
            }
        },
    });
    handleRowSpan(headArr, maxDeep);
    return {
        bottomHeads,
        maxRow: maxDeep,
        maxCol: bottomHeads.length,
    };
}

export interface getHeadRowMergeOption {
    startRow: number;
    startCol: number;
    label: string;
}

export interface headInfo<T> {
    headRow: any[][];
    headMerage: number[][];
    maxRow: number;
    maxCol: number;
    bottomHeads: T[];
}

/**
 * 得到excleJS行数据和合并数据
 *
 *
 * @param headArr
 * @param childrenProp
 */
export function getHeadRowMerge<T extends tableHead>(
    headArr: T[],
    {
        startRow = 0,
        startCol = 0,
    }: Partial<getHeadRowMergeOption> = {}
): headInfo<T> {
    let {maxRow, maxCol, bottomHeads} = handleSpan<T>(headArr);
    let headRow: any[] = [],
        headMerage: number[][] = [];
    let handleHeadRow = (headArr: tableHead[], rowIndex = 0, colIndex = 0) => {
        if (Array.isArray(headArr) && headArr.length) {
            let currRow = (headRow[rowIndex] ??= Array.from({
                length: maxCol + startCol,
            }).fill(''));
            headArr.forEach(head => {
                if (head['_colSpan'] != 1 || head['_rowSpan'] != 1) {
                    // 开始行 开始列 结束行 结束列
                    headMerage.push([
                        rowIndex + 1 + startRow,
                        colIndex + 1 + startCol,
                        rowIndex + head['_rowSpan'] + startRow,
                        colIndex + head['_colSpan'] + startCol,
                    ]);
                }
                currRow[colIndex + startCol] = head['label'] || '';
                handleHeadRow(head.children, rowIndex + 1, colIndex);
                colIndex += head._colSpan;
            });
        }
    };
    handleHeadRow(headArr);
    return {
        headRow,
        headMerage,
        maxRow,
        maxCol,
        bottomHeads,
    };
}
