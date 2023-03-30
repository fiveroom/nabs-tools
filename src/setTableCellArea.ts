import { tableHead } from "./tableHeadTool";

function setCellAreaOfCol(group: CellGroup): { colLen: number; deep: number }{
    let deep = 0;
    const getColLen = (group: CellGroup, dee) => {
        return group.reduce((result, cell) => {
            let l: number;
            if (Array.isArray(cell)) {
                l = getColLen(cell)
            } else if (cell.show && cell.children?.length) {
                l = getColLen(cell.children)
            }
            return result
        }, 0);
    }
    return {colLen: 0, deep: 0}
}

function setCellAreaOfRow(){

}

export function setTableCellArea(group: CellGroup, option){

}

export interface Cell extends tableHead {
    children?: Array<Cell | Array<Cell>>
}

export type CellGroup = Array<Cell | Array<Cell>>;

