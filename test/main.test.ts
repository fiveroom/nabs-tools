import { isEquality } from '../src/main'

// 创建几个相关测试组合在一起的块
describe('isEquality', () => {
    test("test {a: '12', b: [1, 2]} {a: '12', b: [1, 2, 3]}", () => {
        expect(isEquality({a: '12', b: [1, 2]}, {a: '12', b: [1, 2, 3]})).toBe(false);
    });

    test("test {a: '12', b: [1, 2]} {a: '12', b: [1, 2, 3]}, 不比较b属性", () => {
        expect(isEquality({a: '12', b: [1, 2]}, {a: '12', b: [1, 2, 3]}, 'b')).toBe(true);
    });
})

