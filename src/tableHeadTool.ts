
export interface tableHead {
    children?: tableHead[],
    _colSpan?: number;
    _rowSpan?: number;
    _deep?: number;

    [prop: string]: any;

}

export interface handleColSpanOption {
    deep: number;
    callBack: (head: tableHead) => void;
}

/**
 * 计算表格头部的列合并
 * @param headArr
 * @param param1
 * @returns
 */
export function handleColSpan(headArr: tableHead[], { deep = 0, callBack = null }: Partial<handleColSpanOption> = {}): number {
    if (Array.isArray(headArr)) {
        deep++;
        return headArr.reduce((prev, curr) => {
            const colSpan =
                handleColSpan(curr.children, {
                    deep,
                    callBack,
                }) || 1;
            Object.defineProperty(curr, '_colSpan', {
                writable: true,
                value: colSpan,
            });
            Object.defineProperty(curr, '_deep', {
                writable: true,
                value: deep,
            });
            callBack && callBack(curr);
            return colSpan + prev;
        }, 0);
    }
    return 0;
}


/**
 * 计算表格数的行合并
 *
 * @param headArr
 * @param param1
 */
export function handleRowSpan(headArr: tableHead[], maxDeep = 0) {
    headArr.forEach((head) => {
        const hasChild =
            Array.isArray(head.children) && head.children.length;
        if (hasChild) handleRowSpan(head.children, maxDeep);
        Object.defineProperty(head, '_rowSpan', {
            writable: true,
            value: hasChild ? 1 : maxDeep - head['_deep'] + 1,
        });
    });
}

/**
 * 计算表格头部的行和列合并
 *
 * @param headArr
 * @param param1
 * @returns
 */
export function handleSpan(headArr: tableHead[]) {
    let maxDeep = 0, bottomHeads: tableHead[] = [];
    handleColSpan(headArr, {
        callBack: (head) => {
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
    }
}

interface getHeadRowMergeOption {
    startRow: number;
    startCol: number;
}

/**
 * 得到excleJS行数据和合并数据
 *
 *
 * @param headArr
 * @param childrenProp
 */
export function getHeadRowMerge(headArr: tableHead[], { startRow = 0, startCol = 0}: Partial<getHeadRowMergeOption>) {
    let { maxRow, maxCol, bottomHeads} = handleSpan(headArr);
    let headRow: any[] = [],
        headMerage: number[][] =[];
    let handleHeadRow = (headArr: tableHead[], rowIndex = 0, colIndex = 0) => {
        if (Array.isArray(headArr)) {
            let currRow = (headRow[rowIndex] ??= Array.from({
                length: maxCol + startCol,
            }).fill(''));
            headArr.forEach((head) => {
                if (head['_colSpan'] != 1 || head['_rowSpan'] != 1) {
                    // 开始行 开始列 结束行 结束列
                    headMerage.push([
                        rowIndex + 1 + startRow,
                        colIndex + 1 + startCol,
                        rowIndex + head['_rowSpan'] + startRow,
                        colIndex + head['_colSpan'] + startCol,
                    ]);
                }
                currRow[colIndex + startCol] = head.name;
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
        bottomHeads
    }
}
