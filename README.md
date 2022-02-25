## 说明
工具中的excel处理基于[exceljs](https://github.com/exceljs/exceljs/blob/master/README_zh.md)
## 下载
```shell
npm install --save @fiveroom/js-tools
```
## 使用
```ts
    import {faker} from "@faker-js/faker";
    import { ExportEx } from "@fiveroom/js-tools"
    
    let head: xlsxHeadArr = [
        {
            prop: "p1",
            label: "p1",
        },
        {
            prop: "p2",
            label: "p2",
        },
        {
            prop: "p3",
            label: "p3",
            children: [
                {
                    prop: "p6",
                    label: "p6",
                },
                {
                    prop: "p7",
                    label: "p7",
                    children: [
                        {
                            prop: "p8",
                            label: "p8",
                            width: 16,
                        },
                        {
                            prop: "p9",
                            label: "p9",
                            width: 60,
                        },
                    ],
                },
            ],
        },
        {
            prop: "p4",
            label: "p4",
            children: [
                {
                    prop: "p10",
                    label: "p10",
                },
                {
                    prop: "p11",
                    label: "p11",
                },
            ],
        },
        {
            prop: "p5",
            label: "p5",
            format: value => {
                return "p5 format";
            },
            align: "center",
        },
    ];
    let bodyDataa = (num: number = 10) => {
        let headProps = ["p1", "p2", "p6", "p8", "p9", "p10", "p11", "p5"];
        let data = [];
        while (num) {
            let o = {};
            headProps.forEach(prop => {
                o[prop] = prop + faker.address.cityName();
            });
            data.push(o);
            num--;
        }
        return data;
    };
    let e = new ExportEx();
    let sheet = e.addSheet("sheet 1", head, bodyDataa());
    sheet.getColumn(1).hidden = true;
    sheet.getRow(4).hidden = true;
    e.downLoad();
```

- [隐藏行](https://github.com/exceljs/exceljs/blob/master/README_zh.md#%E5%88%97) 
```ts
worksheet.getRow(4).hidden = true;
```
- [隐藏列](https://github.com/exceljs/exceljs/blob/master/README_zh.md#%E8%A1%8C)
```ts
worksheet.getColumn(4).hidden = true;
```

