import {
    handleColSpan,
    handleRowSpan,
    tableHead,
    getHeadRowMerge,
    handleBorderRight,
} from '../src/tableHeadTool';

const createHeadArr: () => tableHead[] = () => {
    return [
        {
            children: [],
            prop: 'p1',
            name: 'p1',
        },
        {
            children: [{ prop: 'p3' }, { prop: 'p4' }],
            prop: 'p7',
        },
        {
            children: [],
            prop: 'p8',
        },
        {
            prop: 'p9',
            children: [
                { prop: 'p10' },
                { prop: 'p11', children: [{ prop: 'p12', label: 'p12' }] },
            ],
        },
    ];
};

describe('行和列计算', () => {
    let head: tableHead[] = createHeadArr();
    let deep = 0;
    let maxCol = handleColSpan(head, {
        callBack: (head, hasChild) => {
            if (!hasChild)
                deep = Math.max(deep, head._deep);
        },
    });
    handleRowSpan(head, deep);

    test('深度', () => {
        expect(deep).toBe(3)
    })

    test('列', () => {
        expect(maxCol).toBe(6);
        expect(head[0]._colSpan).toBe(1);
        expect(head[1]._colSpan).toBe(2);
        expect(head[3].children[1]._colSpan).toBe(1);
    });

    test('行', () => {
        expect(deep).toBe(3);
        expect(head[0]._rowSpan).toBe(3);
        expect(head[1]._rowSpan).toBe(1);
        expect(head[1].children[0]._rowSpan).toBe(2);
    });
});

describe('测试show的加入', () => {
    let head: tableHead[] = createHeadArr();
    head[0].show = false;
    head[1].children[1].show = false;
    head[3].children[1].show = false;
    let deep = 0;
    let maxCol = handleColSpan(head, {
        callBack: (head, hasChild) => {
            if (!hasChild)
                deep = Math.max(deep, head._deep);
        },
    });
    handleRowSpan(head, deep);
    handleBorderRight(head);
    test('列', () => {
        expect(maxCol).toBe(3);
        expect(head[1]._colSpan).toBe(1);
        expect(head[3]._colSpan).toBe(1);
    });

    test('行', () => {
        expect(deep).toBe(2);
        expect(head[0]._rowSpan).toBe(undefined);
        expect(head[1]._rowSpan).toBe(1);
        expect(head[3]._rowSpan).toBe(1);
    })

    test('右侧的计算', () => {
        expect(head[3]._isRight).toBeTruthy();
        expect(head[3].children[0]._isRight).toBeTruthy();
    })
})

describe('得到 exceljs 格式', () => {
    let { headMerge, bottomHeads, headRow } = getHeadRowMerge(createHeadArr());
    let mergeArr = [
        [1, 2, 1, 3],
        [2, 5, 3, 5],
        [1, 1, 3, 1],
    ];
    let rowsTest = [['', '', '', '', '', 'p12']];

    test('合并项', () => {
        expect(headMerge).toEqual(expect.arrayContaining(mergeArr));
    });

    test('行数据', () => {
        expect(headRow).toEqual(expect.arrayContaining(rowsTest));
    });
});

test('寻找右边界', () => {
    let header = createHeadArr();
    handleBorderRight(header);
    expect([
        header[header.length - 1]._isRight,
        header[header.length - 1].children[1]._isRight,
        header[header.length - 1].children[1].children[0]._isRight
    ]).toEqual([true, true, true])
});
