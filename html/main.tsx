import {render} from "react-dom";
import {useState} from "react";
import {Workbook} from "exceljs";
import {getHeadRowMerge} from "lib/tableHeadTool";
import {xlsxHeadArr} from "lib/exceljsExtend";
import {ExportEx} from "lib/exceljsExtend";
import {faker} from "@faker-js/faker";
function App() {
    const [count, setCount] = useState(0);

    let exportUseTool = () => {
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
        // let book = new Workbook();
        // let sheet = book.addWorksheet('使用工具导出');
        // sheet.addRow(['使用工具导出']);
        // let { headRow, headMerage, bottomHeads, maxCol } = getHeadRowMerge(tableHead as xlsxHeadArr[], { startRow: 1 });
        // sheet.addRows(headRow);
        // headRow.forEach((rows, r) => {
        //     rows.forEach((cell, c) => {
        //         if(cell){
        //             sheet.getCell(r + 2, c + 1).border = {
        //                 top: {style:'thin', color: {argb:'000000'}},
        //                 left: {style:'thin', color: {argb:'000000'}},
        //                 bottom: {style:'thin', color: {argb:'000000'}},
        //                 right: {style:'thin', color: {argb:'000000'}}
        //             }
        //         }

        //     })
        // })
        // headMerage.push([1, 1, 1, maxCol]);
        // headMerage.forEach(item => sheet.mergeCells.apply(sheet, item));
        // sheet.columns = bottomHeads.map(item => ({key: item.prop}));
        // sheet.addRows(tableData());
        // sheet.getCell('A1').border = {
        //     top: {style:'thin', color: {argb:'000000'}},
        //     left: {style:'thin', color: {argb:'000000'}},
        //     bottom: {style:'thin', color: {argb:'000000'}},
        //     right: {style:'thin', color: {argb:'000000'}}
        // }
        // book.xlsx.writeBuffer().then(buffer => {
        //     return ExcelTool.downloadBuffer([buffer])
        // });
    };

    return (
        <div>
            <button onClick={exportUseTool}>使用工具导出</button>
        </div>
    );
}

render(<App />, document.getElementById("app"));
