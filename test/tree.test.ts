import {
    treeToMap,
    listToTree,
    getTreeNodeById,
    treeHelper,
} from '../src/tree';

let treeData_01: any[] = [
    {
        name: 'name1',
        children: [
            { name: 'name2', children: [], id: 'id3' },
            {
                name: 'name3',
                children: [{ name: 'name4', children: [], id: 'id4' }],
                id: 'id2',
            },
        ],
        id: 'id1',
    },
];

it('should get four elements', () => {
    let treeMap = treeToMap(treeData_01, 'id');
    expect(Object.keys(treeMap)).toEqual(
        expect.arrayContaining(['id1', 'id2', 'id3', 'id4'])
    );
    expect(treeMap).toEqual(
        expect.objectContaining({
            id4: { name: 'name4', children: [], id: 'id4' },
            id3: { name: 'name2', children: [], id: 'id3' },
        })
    );
});

test('get node from tree by id', () => {
    let { zIndexArr, data } = getTreeNodeById('id4', treeData_01);
    expect(zIndexArr.map(i => i.d.id)).toEqual(['id1', 'id2', 'id4']);
    expect(data).toEqual({ name: 'name4', children: [], id: 'id4' });

    expect(getTreeNodeById('id7', treeData_01)).toEqual({
        zIndexArr: [],
        data: null,
    });
});

test("node name3's deep is 1", () => {
    treeHelper(treeData_01, (node, { deep, zIndexArr }) => {
        node.deep = deep;
        node.zIndexArr = zIndexArr;
    });
    expect(treeData_01[0].children[1].deep).toEqual(1);
    expect(treeData_01[0].children[1].zIndexArr).toEqual([0, 1]);
});

interface TestTreeNode {
    Guid: string;
    ParentGuid: string;
    Label: string;
    Children?: TestTreeNode[];
}

const listTree: TestTreeNode[] = [
    { Guid: '1', ParentGuid: null, Children: [], Label: 'node1' },
    { Guid: '1-2', ParentGuid: '1', Children: [], Label: 'node1-1' },
    { Guid: '2', ParentGuid: null, Children: [], Label: 'node1-2' },
    { Guid: '1-2-1', ParentGuid: '1-2', Children: [], Label: 'node1-2-1' },
    { Guid: '2-1', ParentGuid: '2', Children: [], Label: 'node2-1' },
    { Guid: '2-2', ParentGuid: '2', Children: [], Label: 'node2-2' },
    { Guid: '2-2-3', ParentGuid: '2-2', Children: [], Label: 'node2-2-3' },
    {
        Guid: '2-2-3-1',
        ParentGuid: '2-2-3',
        Children: [],
        Label: 'node2-2-3-1',
    },
    { Guid: '3-1', ParentGuid: '3', Children: [], Label: 'node3-1' },
    { Guid: '3', ParentGuid: null, Children: [], Label: 'node3' },
    { Guid: '3-2', ParentGuid: '3', Children: [], Label: 'node3-2' },
];

const treeData: TestTreeNode[] = [
    {
        Guid: '1',
        ParentGuid: null,
        Children: [
            {
                Guid: '1-2',
                ParentGuid: '1',
                Children: [
                    {
                        Guid: '1-2-1',
                        ParentGuid: '1-2',
                        Children: [],
                        Label: 'node1-2-1',
                    },
                ],
                Label: 'node1-1',
            },
        ],
        Label: 'node1',
    },
    {
        Guid: '2',
        ParentGuid: null,
        Children: [
            { Guid: '2-1', ParentGuid: '2', Children: [], Label: 'node2-1' },
            {
                Guid: '2-2',
                ParentGuid: '2',
                Children: [
                    {
                        Guid: '2-2-3',
                        ParentGuid: '2-2',
                        Children: [
                            {
                                Guid: '2-2-3-1',
                                ParentGuid: '2-2-3',
                                Children: [],
                                Label: 'node2-2-3-1',
                            },
                        ],
                        Label: 'node2-2-3',
                    },
                ],
                Label: 'node2-2',
            },
        ],
        Label: 'node1-2',
    },

    {
        Guid: '3',
        ParentGuid: null,
        Children: [
            { Guid: '3-1', ParentGuid: '3', Children: [], Label: 'node3-1' },
            { Guid: '3-2', ParentGuid: '3', Children: [], Label: 'node3-2' },
        ],
        Label: 'node3',
    },
];

test('test listToTree', () => {
    expect(listToTree(listTree, { children: 'Children' })).toEqual(treeData);
});
