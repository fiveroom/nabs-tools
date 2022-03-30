import { handleColSpan, handleRowSpan, tableHead } from 'lib/tableHeadTool';

import './dynamicTable.less';
import { useState } from 'react';
import { getTreeNodeById } from 'lib/tree';
import { Workbook } from "exceljs";
import { ExportEx } from "lib/exceljsExtend";


const createHeadArr: () => tableHead[] = () => {
    return [
        {
            children: [],
            prop: 'p1', label: "p1",
            name: 'p1',
        },
        {
            children: [{prop: 'p3', label: "p3"}, {prop: 'p4', label: "p4"}],
            prop: 'p7', label: "p7",
        },
        {
            children: [{
                prop: 'p8A1', label: "p8A1",
                children: [{
                    prop: 'p8A1A1', label: "p8A1A1",
                    children: [{
                        prop: 'p8A1A1A2', label: "p8A1A1A2",
                        children: [{prop: 'p8A1A1A2A1', label: "p8A1A1A2A1"}, {prop: 'p8A1A1A2A2', label: "p8A1A1A2A2"}, {prop: 'p8A1A1A2A3', label: "p8A1A1A2A3"}],
                    }, {prop: 'p8A1A1A3', label: "p8A1A1A3"}],
                }, {
                    prop: 'p8A1A2', label: "p8A1A2"
                }],
            }, {
                prop: 'p8A2', label: "p8A2"
            }],
            prop: 'p8', label: "p8",
        },
        {
            prop: 'p9', label: "p9",
            children: [
                {prop: 'p10', label: "p10"},
                {prop: 'p11', label: "p11", children: [{prop: 'p12', label: 'p12'}]},
            ],
        },
    ];
};

const createData = () => {
    return Array.from({length: 20}, (k, v) => {
        return {
            "p1": "p1" + v,
            "p3": "p3" + v,
            "p4": "p4" + v,
            "p7": "p7" + v,
            "p8A1": "p8A1" + v,
            "p8A1A1": "p8A1A1" + v,
            "p8A1A1A2": "p8A1A1A2" + v,
            "p8A1A1A2A1": "p8A1A1A2A1" + v,
            "p8A1A1A2A2": "p8A1A1A2A2" + v,
            "p8A1A1A2A3": "p8A1A1A2A3" + v,
            "p8A1A1A3": "p8A1A1A3" + v,
            "p8A1A2": "p8A1A2" + v,
            "p8A2": "p8A2" + v,
            "p8": "p8" + v,
            "p9": "p9" + v,
            "p10": "p10" + v,
            "p11": "p11" + v,
            "p12": "p12" + v,
            id: 'bData' + v
        }
    })
}

export function DynamicTable() {
    const headsArr = createHeadArr();
    const [headArr, setHeadArr] = useState(createHeadArr());
    const heads: tableHead[][] = [];
    const dataTbody: any[] = createData()
    let deep = 0;
    const bottomHead = [];
    handleColSpan(headArr, {
        callBack: (head, childLen) => {
            heads[head._deep - 1] ??= [];
            heads[head._deep - 1].push(head);
            if (!childLen) {
                deep = Math.max(deep, head._deep);
                bottomHead.push(head);
            }
        },
    });
    handleRowSpan(headArr, deep);
    const hiddenCol = (name: string) => {
        const result = getTreeNodeById(name, headArr, {
            id: 'prop',
            children: 'children'
        });
        result.data.show = false;
        setHeadArr([...headArr]);
    };
    const refresh = () => {
        setHeadArr([createHeadArr()]);
    };

    const exportData = () => {
        const ex = new ExportEx();
        ex.addSheet('sheet01', headArr, dataTbody)
        ex.downLoad();
    }

    return (
        <div>
            <div>
                <button onClick={() => hiddenCol('p8')}>去掉p8</button>
                <button onClick={() => hiddenCol('p4')}>去掉p4</button>
                <button onClick={() => hiddenCol('p10')}>去掉p10</button>
                <button onClick={exportData}>导出</button>
                <button onClick={refresh}>刷新</button>
            </div>
            <table>
                <col style={{width: '120px'}}/>
                <col style={{width: '120px'}}/>
                <col style={{width: '120px'}}/>
                <col style={{width: '120px'}}/>
                <col style={{width: '120px'}}/>
                <col style={{width: '120px'}}/>
                <thead className="thead">
                {heads.map((rowHead, index) => {
                    return (<tr key={index + 'hello'}>
                        {
                            rowHead.map(head => {
                                return (<th key={head.prop} colSpan={head._colSpan} rowSpan={head._rowSpan}>
                                    {head.prop}
                                </th>);
                            })
                        }
                    </tr>);
                })}
                </thead>
                <tbody>
                {
                    dataTbody.map((item => (
                        <tr key={item.id}>{bottomHead.map(head => (<td key={head.prop}>{item[head.prop]}</td>))}</tr>)))
                }
                </tbody>
            </table>

        </div>
    );
}


export function ViewXlsx() {
    const getFile = ({target}) => {
        const file: File = target.files[0];
        const reader = new FileReader();
        file.arrayBuffer().then(arrBuffer => {
            const ws = new Workbook();
            return ws.xlsx.load(arrBuffer)
        }).then(ws => {
            ws.eachSheet((sheet) => {
                const rows = sheet.getRows(0, sheet.rowCount);

                // @ts-ignore
                console.log(sheet._merges, sheet.getSheetValues());
                console.log(rows);
            })
        })
        console.log(target.files[0])
    }
    return (
        <div>
            <input type="file" accept="xlsx" onChange={getFile}/>
        </div>
    )
}
