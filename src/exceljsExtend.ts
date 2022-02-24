import { Alignment, Borders, Column, Font, Style, Workbook, Worksheet } from 'exceljs';
import { tableHead, getHeadRowMerge, headInfo, getHeadRowMergeOption } from './tableHeadTool'
import { downloadBuffer } from './download'

export interface xlsxHead extends tableHead {
    children: Partial<xlsxHead>[];
    prop: string;
    label: string;
    fSize: number;
    width: number;
    height: number;
    headerAlign: string;
    align: 'right' | 'center' | 'left';
}

export type xlsxHeadArr = Array<Partial<xlsxHead>>

export const DEFAULT_HEAD_BORDER_STYLE: Partial<Borders> = {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } }
}

export const DEFAULT_HEAD_FONT_STYLE: Partial<Font> = {
    bold: true,
}

export const DEFAULT_HEAD_ALIGNMENT_STYLE: Partial<Alignment> = {
    vertical: 'middle',
    horizontal: 'center',
    wrapText: true,
}

export const DEFAULT_HEAD_STYLE: Partial<Style> = {
    fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffd8e9fe' },
        // #0000ff
        // bgColor:{argb:'FF0000FF'}
    },
    border: DEFAULT_HEAD_BORDER_STYLE,
    font: DEFAULT_HEAD_FONT_STYLE,
    alignment: DEFAULT_HEAD_ALIGNMENT_STYLE
}

export type xlsxHeadInfo = headInfo<Partial<xlsxHead>>;

export class ExportEx {

    workbook: Workbook;
    sheetMap: Map<Worksheet, xlsxHeadInfo> = new Map();

    constructor() {
        this.workbook = new Workbook();
    }


    addSheet(name: string, headArr: xlsxHeadArr, bodyData: Object[] = []): Worksheet {
        let worksheet = this.workbook.addWorksheet(name);
        let headInfo: xlsxHeadInfo = {headMerage: [], headRow: [], maxCol: 0, maxRow: 0, bottomHeads: []};
        this.sheetMap.set(worksheet, headInfo);
        if(headArr && headArr.length){
            this.addheads(worksheet, headArr);
            this.addBodyData(bodyData, worksheet, headInfo.bottomHeads);
        }
        return worksheet
    }

    /**
     * 对头部进解析并且将行数据加入sheet中
     * - 头的合并信息`不会加入sheet中`，合并信息会在下载的时候自动加入
     * - 需要手动加入，可使用`sheet.mergeCells()`
     *
     * @param sheet
     * @param headArr
     * @param option 指定行和列的开始位置，指定头名称的读取字段，用于单独调用`getHeadRowMerge()`
     */
    addheads(sheet: Worksheet, headArr: xlsxHeadArr, option?: Partial<getHeadRowMergeOption>){
        let headInfo = this.sheetMap.get(sheet);
        if(headInfo){
            let o = Object.assign({}, {startRow: sheet.rowCount, startCol: 0}, option);
            let headInfo_ = getHeadRowMerge<Partial<xlsxHead>>(headArr, o);
            Object.assign(headInfo, headInfo_);
            sheet.addRows(headInfo.headRow);
            headInfo.headRow.forEach((rows, r) => {
                rows.forEach((cell, c) => {
                    if (cell) {
                        sheet.getCell(r + 1 + o.startRow, c + 1 + o.startCol).style = DEFAULT_HEAD_STYLE;
                    }
                })
            })
        }
    }

    addBodyData(bodyData: Object[], worksheet: Worksheet, propHeads: xlsxHeadArr): void {
        let columns: Array<Partial<Column>> = [];
        let bodyStyle: Partial<Style>[] = [];
        let rowCount = worksheet.rowCount;
        propHeads.forEach(item => {
            columns.push({
                width: item.width,
                style: {},
                key: item.prop
            });
            bodyStyle.push({
                border: DEFAULT_HEAD_BORDER_STYLE,
                alignment: Object.assign({}, DEFAULT_HEAD_ALIGNMENT_STYLE, {
                    horizontal: item.align
                }),
                font: { size: item.fSize }
            });
        });
        worksheet.columns = columns;
        worksheet.addRows(bodyData);
        let dataRows = bodyData.length + rowCount, columnCount = propHeads.length;
        for (let i = rowCount + 1; i <= dataRows; i++) {
            for (let j = 1; j <= columnCount; j++) {
                worksheet.getCell(i, j).style = bodyStyle[j - 1];
            }
        }
    }

    downLoad(fileName?: string) {
        this.sheetMap.forEach(({ headMerage }, sheet) => {
            headMerage.forEach(merge => sheet.mergeCells.apply(sheet, merge))
        });
        return this.workbook.xlsx.writeBuffer().then((buffer) => {
            return downloadBuffer([buffer], fileName)
        })
    }

}
