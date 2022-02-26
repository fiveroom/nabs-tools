const through = require("through2");
const { Buffer } = require("buffer");
const { EOL } = require("os");

function delExport(str) {
    const regexInlineImport =
        /\b(export|import)\b\s+.*?\bfrom\b\s*("|'){1}\.[A-Za-z0-9_\.\/]*\2\s*;?\n*/g;
    return str.replace(regexInlineImport, "");
}

function getThirdPart(str) {
    const regexThridImport =
        /\bimport\b\s+.*?\bfrom\b\s*("|'){1}[A-Za-z0-9_@\/]*\1\s*;?\n*/g;
    let matchStr = "";
    str = str.replace(regexThridImport, match => {
        matchStr += match;
        return "";
    });
    return [str, matchStr];
}

function gulpHandleImport() {
    let mergeFile,
        thridParts = "";

    const dealInlineDependent = function (file, enc, cb) {
        if (file.isNull()) {
            cb();
            return;
        }

        if (file.isStream()) {
            this.emit(
                "error",
                new Error("gulp-concat: Streaming not supported")
            );
            cb();
            return;
        }

        if (!mergeFile) {
            mergeFile = file.clone({
                contents: false,
            });
            mergeFile.contents = Buffer.from("");
        }

        let str = file.contents.toString();
        str = delExport(str);
        let thridPart;
        [str, thridPart] = getThirdPart(str);
        thridParts += thridPart;
        mergeFile.contents = Buffer.concat([
            mergeFile.contents,
            Buffer.from(str),
        ]);
        cb();
    };

    const endStream = function (cb) {
        mergeFile.contents = Buffer.concat([
            Buffer.from(thridParts ? thridParts + EOL + EOL : thridParts),
            mergeFile.contents,
        ]);
        this.push(mergeFile);
        cb();
    };

    // 返回文件 stream
    return through.obj(dealInlineDependent, endStream);
}

// 导出插件主函数
module.exports = gulpHandleImport;
