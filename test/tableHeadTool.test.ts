import {handleColSpan, handleRowSpan, tableHead} from '../src/tableHeadTool';

describe('行和列计算', () => {
    const head: tableHead[] = [
        {
            children: [],
            prop: 'p1',
        },
        {
            children: [{prop: 'p3'}, {prop: 'p4'}, {prop: 'p5'}, {prop: 'p6'}],
            prop: 'p7',
        },
        {
            children: [],
            prop: 'p8',
        },
        {
            prop: 'p9',
        },
    ];
    test('列个数', () => {
        let deep = 0;
        expect(
            handleColSpan(head, {
                callBack: head => {
                    if (
                        Array.isArray(!head.children) ||
                        head.children.length === 0
                    )
                        deep = Math.max(deep, head._deep);
                },
            })
        ).toBe(7);
        // expect(handleRowSpan(head, deep)).;
    });
});
