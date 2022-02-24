import type { Workbook } from 'exceljs';


export interface xlsxHead {
    children: xlsxHead[];
    prop: string;
    label: string;
    fSize: number;
    width: number;
    height: number;
    headerAlign: string;
    align: 'right' | 'center' | 'left';
    [prop: string]: any;
}

export type xlsxHeadArr = Partial<xlsxHead>[]

export const DEFAULT_BODY_STYLE = {}

export class ExportEx {

}
