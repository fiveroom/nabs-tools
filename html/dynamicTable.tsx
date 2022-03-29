import { handleColSpan, handleRowSpan, tableHead } from 'lib/tableHeadTool';

import './dynamicTable.less';
import { useState } from 'react';
import { getTreeNodeById } from 'lib/tree';

const createHeadArr: () => tableHead[] = () => {
    return [
        {
            children: [],
            prop: 'p1',
            name: 'p1',
        },
        {
            children: [{prop: 'p3'}, {prop: 'p4'}],
            prop: 'p7',
        },
        {
            children: [{
                prop: 'p8A1',
                children: [{prop: 'p8A1A1',
                    children: [{prop: 'p8A1A1A2',
                        children: [{prop: 'p8A1A1A2A1'}, {prop: 'p8A1A1A2A2'}, {prop: 'p8A1A1A2A3'}],
                    }, {prop: 'p8A1A1A3'}],
                }, {prop: 'p8A1A2'
                }],
            }, {
                prop: 'p8A2'
            }],
            prop: 'p8',
        },
        {
            prop: 'p9',
            children: [
                {prop: 'p10'},
                {prop: 'p11', children: [{prop: 'p12', label: 'p12'}]},
            ],
        },
    ];
};

const createData = () => {
   return  Array.from({length: 20}, (k, v) => {
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

    return (
        <div>
            <div>
                <button onClick={() => hiddenCol('p8')}>去掉p8</button>
                <button onClick={() => hiddenCol('p4')}>去掉p4</button>
                <button onClick={() => hiddenCol('p10')}>去掉p10</button>
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
                    dataTbody.map((item => (<tr key={item.id}>{bottomHead.map(head => (<td key={head.prop}>{item[head.prop]}</td>))}</tr>)))
                }
                </tbody>
            </table>

        </div>
    );
}
