import {
    getTreeNodeById,
    listToTree,
    LookupWay,
    treeHelper,
    treeToMap,
} from '../src/tree';
import { tableHead, handleColSpan } from '../src/tableHeadTool';

let treeData_01: tableHead[] = [
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
    {
        name: 'name444',
        children: [
            {
                name: 'name555',
            },
            {
                name: 'name666',
                children: [
                    {
                        name: '4444',
                    },
                    {
                        name: '888',
                    },
                ],
            },
        ],
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

test('前序遍历', () => {
    const name = [];
    treeHelper(
        treeData_01,
        node => {
            name.push(node.name);
        },
        { lookupWay: LookupWay.前序遍历 }
    );
    expect(name).toEqual(['name1', 'name2', 'name3', 'name4']);
});

test('后序遍历', () => {
    const name = [];
    treeHelper(
        treeData_01,
        (node, { deep, zIndexArr }) => {
            node.deep = deep;
            node.zIndexArr = zIndexArr;
            name.push(node.name);
        },
        { lookupWay: LookupWay.后序遍历 }
    );
    expect(name).toEqual([
        'name2',
        'name4',
        'name3',
        'name1',
        'name555',
        '4444',
        '888',
        'name666',
        'name444',
    ]);
});

interface TestTreeNode {
    Guid: string;
    ParentGuid: string;
    Label: string;
    Children?: TestTreeNode[];

    [prop: string]: any;
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

const listTreeSmall: TestTreeNode[] = [
    { Guid: '1', ParentGuid: null, Children: [], Label: 'node1' },
    { Guid: '1-2', ParentGuid: '1', Children: [], Label: 'node1-1' },
    { Guid: '2', ParentGuid: null, Children: [], Label: 'node1-2' },
    { Guid: '2-1', ParentGuid: '2', Children: [], Label: 'node2-1' },
    { Guid: '3-1', ParentGuid: '3', Children: [], Label: 'node3-1' },
    { Guid: '3', ParentGuid: null, Children: [], Label: 'node3' },
];

const treeDataSmall: TestTreeNode[] = [
    {
        Guid: '1',
        ParentGuid: null,
        hahah: 213,
        Children: [
            {
                Guid: '1-2',
                ParentGuid: '1',
                hahah: 213,
                Children: [],
                Label: 'node1-1',
            },
        ],
        Label: 'node1',
    },
    {
        Guid: '2',
        hahah: 213,
        ParentGuid: null,
        Children: [
            {
                Guid: '2-1',
                ParentGuid: '2',
                hahah: 213,
                Children: [],
                Label: 'node2-1',
            },
        ],
        Label: 'node1-2',
    },

    {
        Guid: '3',
        hahah: 213,
        ParentGuid: null,
        Children: [
            {
                Guid: '3-1',
                ParentGuid: '3',
                hahah: 213,
                Children: [],
                Label: 'node3-1',
            },
        ],
        Label: 'node3',
    },
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
    expect(
        listToTree(listTreeSmall, {
            children: 'Children',
            callBack: data => {
                return { ...data, hahah: 213 };
            },
        })
    ).toEqual(treeDataSmall);
});

test('test _id', () => {
    handleColSpan(treeData_01, void 0, null, true);
    let hasID = true;
    treeHelper(treeData_01, data => {
        hasID = !!data._id;
    });
    expect(hasID).toEqual(true);
});

test('test tree loop stop', () => {
    let ids = new Set();
    treeHelper(
        treeData,
        data => {
            ids.add(data.Guid);
        },
        { whenStop: item => item.Guid === '2-1', childrenProp: 'Children' }
    );
    expect(ids.size).toEqual(5);
});
