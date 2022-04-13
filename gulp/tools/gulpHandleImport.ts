import through from 'through2'
import { Buffer } from 'buffer'
import { EOL } from 'os'
import stream from 'stream'


function delExport(str) {
    const regexInlineImport =
        /\b(export|import)\b\s+.*?\bfrom\b\s*(['"])\.[A-Za-z0-9_.\/]*\2\s*;?\n*/g;
    return str.replace(regexInlineImport, "");
}

/**
 * 获取第三方的引入
 */
function getThirdPart(str) {
    const regexThirdImport =
        /\bimport\b\s+.*?\bfrom\b\s*(['"])[A-Za-z0-9_@\/.]*\1\s*;?\n*/g;
    let matchStr = "";
    str = str.replace(regexThirdImport, match => {
        matchStr += match;
        return "";
    });
    return [str, matchStr];
}

function gulpHandleImport() {
    let mergeFile,
        thirdParts = "";

    const dealInlineDependent = function (this: stream.Transform, file, enc, cb) {
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

        // 得到第三方引入，并将其放入声明文件的顶部
        let threePart;
        [str, threePart] = getThirdPart(str);
        thirdParts += threePart;
        mergeFile.contents = Buffer.concat([
            mergeFile.contents,
            Buffer.from(str),
        ]);
        cb();
    };

    const endStream = function (this: stream.Transform, cb) {
        mergeFile.contents = Buffer.concat([
            Buffer.from(thirdParts ? thirdParts + EOL + EOL : thirdParts),
            mergeFile.contents,
        ]);
        this.push(mergeFile);
        cb();
    };

    // 返回文件 stream
    return through.obj(dealInlineDependent, endStream);
}

// 导出插件主函数
export {
    gulpHandleImport
}
