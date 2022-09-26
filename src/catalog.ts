// 点数字 章节 括号 大写
type INumSer = 'numPoint' | 'chapter' | 'bracket' | 'upper' | 'upper1';

export class Catalog {
    static distNum = [
        '零',
        '一',
        '二',
        '三',
        '四',
        '五',
        '六',
        '七',
        '八',
        '九',
        '十',
    ];

    static dictUnit = {
        1: '',
        10: '十',
        100: '百',
        1000: '千',
        10000: '万',
        100000000: '亿',
    };

    static numMap: { [prop: number]: string } = {};

    /**
     * 返回目录结构
     * @param treeData
     * @param childProp
     * @param type  类型
     * - upper1: 一、|（一）|1.|（1）
     * - chapter: 第一章|一、|1.|（1）
     * - bracket: （一）|1.|（1）|1.
     * - upper: 一、|1.|（1）|1.
     * @param deep
     * @param location
     */
    static countSerial(
        treeData: any[],
        childProp: string = 'children',
        type: INumSer = 'numPoint',
        deep = 1,
        location: number[] = []
    ) {
        if (!Array.isArray(treeData)) return;
        let len = location.push(0);
        treeData.forEach((item, index) => {
            location[len - 1] = index + 1;
            item.__seralNum__ = location.join('.');
            item.__deep__ = len;
            item.__seralTNnm__ = this.getTNum(item.__seralNum__, type);
            this.countSerial(
                item[childProp],
                childProp,
                type,
                ++deep,
                location
            );
        });
        location.pop();
    }

    /**
     * 返回目录结构
     * @param seralNum 1.1.1.1
     * @param type  类型
     * upper1: 一、|（一）|1.|（1）
     * chapter: 第一章|一、|1.|（1）
     * bracket: （一）|1.|（1）|1.
     * upper: 一、|1.|（1）|1.
     */
    static getTNum(seralNum: string, type: INumSer) {
        let seralNumList = seralNum.split('.');
        switch (type) {
            case 'chapter':
                return this.chapterStr(
                    seralNumList.length,
                    Number(seralNumList.pop())
                );
            case 'bracket':
                return this.bracketStr(
                    seralNumList.length,
                    Number(seralNumList.pop())
                );
            case 'upper1':
                return this.upper1Str(
                    seralNumList.length,
                    Number(seralNumList.pop())
                );
            case 'upper':
                return this.upperStr(
                    seralNumList.length,
                    Number(seralNumList.pop())
                );
            default:
                return seralNum;
        }
    }

    static chapterStr(deep: number, num: number): string {
        switch (deep) {
            case 1:
                return this.chapterNum(num);
            case 2:
                return this.upperNum(num);
            case 3:
                return this.numPoint(num);
            case 4:
                return this.numBracket(num);
            default:
                return this.numPoint(num);
        }
    }

    static bracketStr(deep: number, num: number): string {
        switch (deep) {
            case 1:
                return this.bracketNum(num);
            case 2:
                return this.numPoint(num);
            case 3:
                return this.numBracket(num);
            case 4:
                return this.numPoint(num);
            default:
                return this.numPoint(num);
        }
    }

    static upper1Str(deep: number, num: number): string {
        switch (deep) {
            case 1:
                return this.upperNum(num);
            case 2:
                return this.bracketNum(num);
            case 3:
                return this.numPoint(num);
            case 4:
                return this.numBracket(num);
            default:
                return this.numPoint(num);
        }
    }

    static upperStr(deep: number, num: number): string {
        switch (deep) {
            case 1:
                return this.upperNum(num);
            case 2:
                return this.numPoint(num);
            case 3:
                return this.numBracket(num);
            case 4:
                return this.numPoint(num);
            default:
                return this.numPoint(num);
        }
    }

    /**
     * @description 数字转中文加括号
     * @param num 数字
     *
     * @returns （一） | （二）
     */
    static chapterNum(num: number): string {
        return `第${this.numToZH_CN(num)}章`;
    }

    /**
     * @description 数字转中文加括号
     * @param num 数字
     *
     * @returns （一） | （二）
     */
    static bracketNum(num: number): string {
        return `（${this.numToZH_CN(num)}）`;
    }

    /**
     * @description 数字转中文加顿号
     * @param num 数字
     *
     * @returns 一、 | 二、
     */
    static upperNum(num: number): string {
        return `${this.numToZH_CN(num)}、`;
    }

    /**
     * @description 数字加括号
     * @param num 数字
     *
     * @returns （1） | （2）
     */
    static numBracket(num: number): string {
        return `（${num}）`;
    }

    // 数字加点
    static numPoint(num: number): string {
        return `${num}. `;
    }

    /**
     * @description 数字转中文
     * @returns 1 => 一
     */
    static numToZH_CN(num: number): string {
        if (!this.numMap) this.numMap = {};
        if (this.numMap[num]) {
            return this.numMap[num];
        }
        if (num < 10) {
            return this.distNum[num];
        }
        if (num >= 1000000000000) {
            throw Error('只支持1000000000000以下数字转换');
        }
        let len = num.toString().length - 1;
        let resStr = '';
        while (len >= 0) {
            const divisor = 10 ** len;
            let maxV = Math.floor(num / divisor);
            num -= maxV * divisor;
            resStr +=
                this.distNum[maxV] + (maxV == 0 ? '' : this.getUnit(divisor));
            if (num === 0) {
                break;
            }
            len--;
        }
        resStr = resStr.replace(/(零)+/g, '零').replace(/零+$/, '');
        this.numMap[num] = resStr;
        return resStr;
    }

    static getUnit(num: number) {
        let unit = this.dictUnit[num];
        while (unit === undefined) {
            num /= 10000;
            unit = this.dictUnit[num];
        }
        return unit;
    }
}
