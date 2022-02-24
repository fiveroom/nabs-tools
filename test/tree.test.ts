import { treeToMap, delTreeNoneNode, getTreeNodeById } from '../src/tree';

let treeData_01 = [
    {
        name: 'name1', children: [
            { name: 'name2', children: [], id: 'id3' },
            {
                name: 'name3', children: [
                    { name: 'name4', children: [], id: 'id4' }
                ], id: 'id2'
            },
        ], id: 'id1'
    },
];

it('should get four elements', () => {
    let treeMap = treeToMap(treeData_01, 'id');
    expect(Object.keys(treeMap)).toEqual(expect.arrayContaining(['id1', 'id2', 'id3', 'id4']));
    expect(treeMap).toEqual(expect.objectContaining({
        id4: { name: 'name4', children: [], id: 'id4' },
        id3: { name: 'name2', children: [], id: 'id3' }
    }))
})

test('get node from tree by id', () => {
    let { zIndexArr, data } = getTreeNodeById('id4', treeData_01);
    expect(zIndexArr.map(i => i.d.id)).toEqual(['id1', 'id2', 'id4']);
    expect(data).toEqual({ name: 'name4', children: [], id: 'id4' });

    expect(getTreeNodeById('id7', treeData_01)).toEqual({
        zIndexArr: [],
        data: null
    })
})





