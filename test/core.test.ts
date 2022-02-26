import { getDeepObj, isEquality } from '../src/core';

test('深对象获取', () => {
    let o = { a: { b: { c: 123 } } };
    expect(getDeepObj(o, 'a.b.c')).toBe(123);
});

// 创建几个相关测试组合在一起的块
describe('isEquality', () => {
    test("test {a: '12', b: [1, 2]} {a: '12', b: [1, 2, 3]}", () => {
        expect(
            isEquality({ a: '12', b: [1, 2] }, { a: '12', b: [1, 2, 3] })
        ).toBe(false);
    });

    test("test {a: '12', b: [1, 2]} {a: '12', b: [1, 2, 3]}, 不比较b属性", () => {
        expect(
            isEquality({ a: '12', b: [1, 2] }, { a: '12', b: [1, 2, 3] }, 'b')
        ).toBe(true);
    });
});
