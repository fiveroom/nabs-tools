import { render } from "react-dom";
import { useState } from "react";
import { Workbook } from "exceljs";
import { getHeadRowMerge, handleBorderRight, handleColSpan, handleRowSpan, tableHead } from "lib/tableHeadTool";
import { xlsxHeadArr } from "lib/exceljsExtend";
import { ExportEx } from "lib/exceljsExtend";
import { faker } from "@faker-js/faker";
import { headsXNGD, testData } from "./mock/data01";
import { downloadBuffer } from 'lib/download';


function App() {
    const [count, setCount] = useState(0);
    const createheader: () => xlsxHeadArr = () => [
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
                            width: 80,
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
    const bodyData = (num: number = 10) => {
        let headProps = ["p1", "p2", "p6", "p8", "p9", "p10", "p11", "p5"];
        let data = [];
        while (num) {
            let o = {};
            headProps.forEach((prop, index) => {
                o[prop] = index + prop + faker.address.cityName();
            });
            data.push(o);
            num--;
        }
        return data;
    };
    let exportUseTool = () => {
        let head: xlsxHeadArr = createheader();
        let e = new ExportEx();
        let sheet = e.addSheet("sheet 1", head, bodyData());
        sheet.getColumn(1).hidden = true;
        sheet.getRow(4).hidden = true;
        e.downLoad();
    };

    let exportHeadTop = () => {
        let head: xlsxHeadArr = createheader();
        let e = new ExportEx();
        let sheet = e.addSheet("sheet 1");
        sheet.addRow(["顶部行"]);
        let headInfo = e.addheads(sheet, head); // 添加头
        e.bodyHeight = 100;

        e.addBodyData(bodyData(), sheet, headInfo.bottomHeads);
        // 对第一行添加合并
        sheet.mergeCells(1, 1, 1, headInfo.maxCol);
        // 对第一行添加样式
        sheet.getCell(1, 1).style = {
            alignment: ExportEx.defaultHeadStyle.alignment,
        };
        sheet.getCell(1, headInfo.maxCol).style.border =
            ExportEx.defaultHeadStyle.border;

        sheet.getRow(1).height = 80;
        e.downLoad();
    };
    const exportHeadTopD = () => {
        let e = new ExportEx();
        let sheet = e.addSheet("sheet 1");
        sheet.properties.defaultRowHeight = 70;
        let headInfo = e.addheads(sheet, headsXNGD as any); // 添加头
        e.addBodyData(testData, sheet, headInfo.bottomHeads);
        sheet.getColumn(1).hidden = true;
        sheet.getRow(4).hidden = true;
        e.downLoad("hahaha");
    };

    const exportTree = () => {
        const wb = new Workbook();
        const ws = wb.addWorksheet('ss');
        ws.addTable({
            name: 'MyTable',
            ref: 'A1',
            headerRow: true,
            totalsRow: false,
            style: {
                showRowStripes: true,
            },
            columns: [
                {name: 'Date', totalsRowLabel: 'Totals:', filterButton: false},
                {name: 'Amount', totalsRowFunction: 'sum', filterButton: false},
            ],
            rows: [
                [new Date('2019-07-20'), 70.10],
                [new Date('2019-07-21'), 70.60],
                [new Date('2019-07-22'), 70.10],
            ],
        });
        wb.xlsx.writeBuffer().then(buffer => {
            return downloadBuffer([buffer], 'fileName');
        });
    }

    const colSpanTest = () => {
        const headArr: tableHead[] = [
            {
                label: '1',
                show: true,
                children: [
                    {
                        show: true,
                        label: '1-1'
                    },
                    {
                        show: false,
                        label: '1-2'
                    }
                ]
            },
            {
                label: '2',
                show: true,
                rowSpan: 2
            },
            {
                label: '3',
                show: false,
                children: [
                    {
                        show: true,
                        label: '3-1'
                    }
                ]
            }
        ];
        let maxDeep = 0;
        handleColSpan(headArr, {
            callBack: (head, hasChild) => {
                if (!hasChild) {
                    maxDeep = Math.max(maxDeep, head._deep);
                }
            },
        });
        handleRowSpan(headArr, maxDeep);
        handleBorderRight(headArr)
        console.log(headArr);
    }

    return (
        <div>
            <button onClick={exportUseTool}>使用工具导出</button>
            <button onClick={exportHeadTop}>添加头部行信息</button>
            <button onClick={exportHeadTopD}>测试</button>
            <button onClick={exportTree}>导出树表格</button>
            <button onClick={colSpanTest}>测试colSpan</button>
        </div>
    );
}

render(<App/>, document.getElementById("app"));
