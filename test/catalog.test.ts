import { Catalog } from '../src/catalog';


test('中文', () => {
    expect(Catalog.numToZH_CN(123)).toEqual('一百二十三')
    expect(Catalog.numToZH_CN(1233)).toEqual('一千二百三十三')
    expect(Catalog.numToZH_CN(20)).toEqual('二十')
    expect(Catalog.numToZH_CN(0)).toEqual('零')
})
