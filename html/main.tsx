import {render} from "react-dom";
import {useState} from "react";
import {Workbook} from "exceljs";
import {getHeadRowMerge} from "lib/tableHeadTool";
import {xlsxHeadArr} from "lib/exceljsExtend";
import {ExportEx} from "lib/exceljsExtend";
import {faker} from "@faker-js/faker";
function App() {
    const [count, setCount] = useState(0);
    const createheader: () => xlsxHeadArr = () => ([
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
    ]);
    const bodyData = (num: number = 10) => {
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
        sheet.addRow(['顶部行']);
        let headInfo = e.addheads(sheet, head); // 添加头
        e.addBodyData(bodyData(), sheet, headInfo.bottomHeads);
        // 对第一行添加合并
        sheet.mergeCells(1, 1, 1, headInfo.maxCol);
        // 对第一行添加样式
        sheet.getCell(1, 1).style = {
            alignment: ExportEx.defaultHeadStyle.alignment
        }
        sheet.getCell(1, headInfo.maxCol).style.border = ExportEx.defaultHeadStyle.border;

        sheet.getRow(1).height = 30;
        e.downLoad()
    }

    return (
        <div>
            <button onClick={exportUseTool}>使用工具导出</button>
            <button onClick={exportHeadTop}>添加头部行信息</button>
        </div>
    );
}

render(<App />, document.getElementById("app"));
