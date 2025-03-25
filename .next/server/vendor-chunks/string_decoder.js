"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/string_decoder";
exports.ids = ["vendor-chunks/string_decoder"];
exports.modules = {

/***/ "(ssr)/./node_modules/string_decoder/lib/string_decoder.js":
/*!***********************************************************!*\
  !*** ./node_modules/string_decoder/lib/string_decoder.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n/*<replacement>*/ var Buffer = (__webpack_require__(/*! safe-buffer */ \"(ssr)/./node_modules/safe-buffer/index.js\").Buffer);\n/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {\n    encoding = \"\" + encoding;\n    switch(encoding && encoding.toLowerCase()){\n        case \"hex\":\n        case \"utf8\":\n        case \"utf-8\":\n        case \"ascii\":\n        case \"binary\":\n        case \"base64\":\n        case \"ucs2\":\n        case \"ucs-2\":\n        case \"utf16le\":\n        case \"utf-16le\":\n        case \"raw\":\n            return true;\n        default:\n            return false;\n    }\n};\nfunction _normalizeEncoding(enc) {\n    if (!enc) return \"utf8\";\n    var retried;\n    while(true){\n        switch(enc){\n            case \"utf8\":\n            case \"utf-8\":\n                return \"utf8\";\n            case \"ucs2\":\n            case \"ucs-2\":\n            case \"utf16le\":\n            case \"utf-16le\":\n                return \"utf16le\";\n            case \"latin1\":\n            case \"binary\":\n                return \"latin1\";\n            case \"base64\":\n            case \"ascii\":\n            case \"hex\":\n                return enc;\n            default:\n                if (retried) return; // undefined\n                enc = (\"\" + enc).toLowerCase();\n                retried = true;\n        }\n    }\n}\n;\n// Do not cache `Buffer.isEncoding` when checking encoding names as some\n// modules monkey-patch it to support additional encodings\nfunction normalizeEncoding(enc) {\n    var nenc = _normalizeEncoding(enc);\n    if (typeof nenc !== \"string\" && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error(\"Unknown encoding: \" + enc);\n    return nenc || enc;\n}\n// StringDecoder provides an interface for efficiently splitting a series of\n// buffers into a series of JS strings without breaking apart multi-byte\n// characters.\nexports.StringDecoder = StringDecoder;\nfunction StringDecoder(encoding) {\n    this.encoding = normalizeEncoding(encoding);\n    var nb;\n    switch(this.encoding){\n        case \"utf16le\":\n            this.text = utf16Text;\n            this.end = utf16End;\n            nb = 4;\n            break;\n        case \"utf8\":\n            this.fillLast = utf8FillLast;\n            nb = 4;\n            break;\n        case \"base64\":\n            this.text = base64Text;\n            this.end = base64End;\n            nb = 3;\n            break;\n        default:\n            this.write = simpleWrite;\n            this.end = simpleEnd;\n            return;\n    }\n    this.lastNeed = 0;\n    this.lastTotal = 0;\n    this.lastChar = Buffer.allocUnsafe(nb);\n}\nStringDecoder.prototype.write = function(buf) {\n    if (buf.length === 0) return \"\";\n    var r;\n    var i;\n    if (this.lastNeed) {\n        r = this.fillLast(buf);\n        if (r === undefined) return \"\";\n        i = this.lastNeed;\n        this.lastNeed = 0;\n    } else {\n        i = 0;\n    }\n    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);\n    return r || \"\";\n};\nStringDecoder.prototype.end = utf8End;\n// Returns only complete characters in a Buffer\nStringDecoder.prototype.text = utf8Text;\n// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer\nStringDecoder.prototype.fillLast = function(buf) {\n    if (this.lastNeed <= buf.length) {\n        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);\n        return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n    }\n    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);\n    this.lastNeed -= buf.length;\n};\n// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a\n// continuation byte. If an invalid byte is detected, -2 is returned.\nfunction utf8CheckByte(byte) {\n    if (byte <= 0x7F) return 0;\n    else if (byte >> 5 === 0x06) return 2;\n    else if (byte >> 4 === 0x0E) return 3;\n    else if (byte >> 3 === 0x1E) return 4;\n    return byte >> 6 === 0x02 ? -1 : -2;\n}\n// Checks at most 3 bytes at the end of a Buffer in order to detect an\n// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)\n// needed to complete the UTF-8 character (if applicable) are returned.\nfunction utf8CheckIncomplete(self, buf, i) {\n    var j = buf.length - 1;\n    if (j < i) return 0;\n    var nb = utf8CheckByte(buf[j]);\n    if (nb >= 0) {\n        if (nb > 0) self.lastNeed = nb - 1;\n        return nb;\n    }\n    if (--j < i || nb === -2) return 0;\n    nb = utf8CheckByte(buf[j]);\n    if (nb >= 0) {\n        if (nb > 0) self.lastNeed = nb - 2;\n        return nb;\n    }\n    if (--j < i || nb === -2) return 0;\n    nb = utf8CheckByte(buf[j]);\n    if (nb >= 0) {\n        if (nb > 0) {\n            if (nb === 2) nb = 0;\n            else self.lastNeed = nb - 3;\n        }\n        return nb;\n    }\n    return 0;\n}\n// Validates as many continuation bytes for a multi-byte UTF-8 character as\n// needed or are available. If we see a non-continuation byte where we expect\n// one, we \"replace\" the validated continuation bytes we've seen so far with\n// a single UTF-8 replacement character ('\\ufffd'), to match v8's UTF-8 decoding\n// behavior. The continuation byte check is included three times in the case\n// where all of the continuation bytes for a character exist in the same buffer.\n// It is also done this way as a slight performance increase instead of using a\n// loop.\nfunction utf8CheckExtraBytes(self, buf, p) {\n    if ((buf[0] & 0xC0) !== 0x80) {\n        self.lastNeed = 0;\n        return \"�\";\n    }\n    if (self.lastNeed > 1 && buf.length > 1) {\n        if ((buf[1] & 0xC0) !== 0x80) {\n            self.lastNeed = 1;\n            return \"�\";\n        }\n        if (self.lastNeed > 2 && buf.length > 2) {\n            if ((buf[2] & 0xC0) !== 0x80) {\n                self.lastNeed = 2;\n                return \"�\";\n            }\n        }\n    }\n}\n// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.\nfunction utf8FillLast(buf) {\n    var p = this.lastTotal - this.lastNeed;\n    var r = utf8CheckExtraBytes(this, buf, p);\n    if (r !== undefined) return r;\n    if (this.lastNeed <= buf.length) {\n        buf.copy(this.lastChar, p, 0, this.lastNeed);\n        return this.lastChar.toString(this.encoding, 0, this.lastTotal);\n    }\n    buf.copy(this.lastChar, p, 0, buf.length);\n    this.lastNeed -= buf.length;\n}\n// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a\n// partial character, the character's bytes are buffered until the required\n// number of bytes are available.\nfunction utf8Text(buf, i) {\n    var total = utf8CheckIncomplete(this, buf, i);\n    if (!this.lastNeed) return buf.toString(\"utf8\", i);\n    this.lastTotal = total;\n    var end = buf.length - (total - this.lastNeed);\n    buf.copy(this.lastChar, 0, end);\n    return buf.toString(\"utf8\", i, end);\n}\n// For UTF-8, a replacement character is added when ending on a partial\n// character.\nfunction utf8End(buf) {\n    var r = buf && buf.length ? this.write(buf) : \"\";\n    if (this.lastNeed) return r + \"�\";\n    return r;\n}\n// UTF-16LE typically needs two bytes per character, but even if we have an even\n// number of bytes available, we need to check if we end on a leading/high\n// surrogate. In that case, we need to wait for the next two bytes in order to\n// decode the last character properly.\nfunction utf16Text(buf, i) {\n    if ((buf.length - i) % 2 === 0) {\n        var r = buf.toString(\"utf16le\", i);\n        if (r) {\n            var c = r.charCodeAt(r.length - 1);\n            if (c >= 0xD800 && c <= 0xDBFF) {\n                this.lastNeed = 2;\n                this.lastTotal = 4;\n                this.lastChar[0] = buf[buf.length - 2];\n                this.lastChar[1] = buf[buf.length - 1];\n                return r.slice(0, -1);\n            }\n        }\n        return r;\n    }\n    this.lastNeed = 1;\n    this.lastTotal = 2;\n    this.lastChar[0] = buf[buf.length - 1];\n    return buf.toString(\"utf16le\", i, buf.length - 1);\n}\n// For UTF-16LE we do not explicitly append special replacement characters if we\n// end on a partial character, we simply let v8 handle that.\nfunction utf16End(buf) {\n    var r = buf && buf.length ? this.write(buf) : \"\";\n    if (this.lastNeed) {\n        var end = this.lastTotal - this.lastNeed;\n        return r + this.lastChar.toString(\"utf16le\", 0, end);\n    }\n    return r;\n}\nfunction base64Text(buf, i) {\n    var n = (buf.length - i) % 3;\n    if (n === 0) return buf.toString(\"base64\", i);\n    this.lastNeed = 3 - n;\n    this.lastTotal = 3;\n    if (n === 1) {\n        this.lastChar[0] = buf[buf.length - 1];\n    } else {\n        this.lastChar[0] = buf[buf.length - 2];\n        this.lastChar[1] = buf[buf.length - 1];\n    }\n    return buf.toString(\"base64\", i, buf.length - n);\n}\nfunction base64End(buf) {\n    var r = buf && buf.length ? this.write(buf) : \"\";\n    if (this.lastNeed) return r + this.lastChar.toString(\"base64\", 0, 3 - this.lastNeed);\n    return r;\n}\n// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)\nfunction simpleWrite(buf) {\n    return buf.toString(this.encoding);\n}\nfunction simpleEnd(buf) {\n    return buf && buf.length ? this.write(buf) : \"\";\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3RyaW5nX2RlY29kZXIvbGliL3N0cmluZ19kZWNvZGVyLmpzIiwibWFwcGluZ3MiOiJBQUFBLHNEQUFzRDtBQUN0RCxFQUFFO0FBQ0YsMEVBQTBFO0FBQzFFLGdFQUFnRTtBQUNoRSxzRUFBc0U7QUFDdEUsc0VBQXNFO0FBQ3RFLDRFQUE0RTtBQUM1RSxxRUFBcUU7QUFDckUsd0JBQXdCO0FBQ3hCLEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUseURBQXlEO0FBQ3pELEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUsNkRBQTZEO0FBQzdELDRFQUE0RTtBQUM1RSwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBQ3hFLDRFQUE0RTtBQUM1RSx5Q0FBeUM7QUFFekM7QUFFQSxlQUFlLEdBRWYsSUFBSUEsU0FBU0MsNEZBQTZCO0FBQzFDLGdCQUFnQixHQUVoQixJQUFJQyxhQUFhRixPQUFPRSxVQUFVLElBQUksU0FBVUMsUUFBUTtJQUN0REEsV0FBVyxLQUFLQTtJQUNoQixPQUFRQSxZQUFZQSxTQUFTQyxXQUFXO1FBQ3RDLEtBQUs7UUFBTSxLQUFLO1FBQU8sS0FBSztRQUFRLEtBQUs7UUFBUSxLQUFLO1FBQVMsS0FBSztRQUFTLEtBQUs7UUFBTyxLQUFLO1FBQVEsS0FBSztRQUFVLEtBQUs7UUFBVyxLQUFLO1lBQ3hJLE9BQU87UUFDVDtZQUNFLE9BQU87SUFDWDtBQUNGO0FBRUEsU0FBU0MsbUJBQW1CQyxHQUFHO0lBQzdCLElBQUksQ0FBQ0EsS0FBSyxPQUFPO0lBQ2pCLElBQUlDO0lBQ0osTUFBTyxLQUFNO1FBQ1gsT0FBUUQ7WUFDTixLQUFLO1lBQ0wsS0FBSztnQkFDSCxPQUFPO1lBQ1QsS0FBSztZQUNMLEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztnQkFDSCxPQUFPO1lBQ1QsS0FBSztZQUNMLEtBQUs7Z0JBQ0gsT0FBTztZQUNULEtBQUs7WUFDTCxLQUFLO1lBQ0wsS0FBSztnQkFDSCxPQUFPQTtZQUNUO2dCQUNFLElBQUlDLFNBQVMs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QUFRLENBQUMsVUFBVUw7SUFDM0MsSUFBSSxDQUFDUixRQUFRLEdBQUcsSUFBSXlCO0lBQ3BCLElBQUksQ0FBQ3hCLFNBQVMsR0FBRztJQUNqQixJQUFJd0IsTUFBTSxHQUFHO1FBQ1gsSUFBSSxDQUFDdkIsUUFBUSxDQUFDLEVBQUUsR0FBR0csR0FBRyxDQUFDQSxJQUFJQyxNQUFNLEdBQUcsRUFBRTtJQUN4QyxPQUFPO1FBQ0wsSUFBSSxDQUFDSixRQUFRLENBQUMsRUFBRSxHQUFHRyxHQUFHLENBQUNBLElBQUlDLE1BQU0sR0FBRyxFQUFFO1FBQ3RDLElBQUksQ0FBQ0osUUFBUSxDQUFDLEVBQUUsR0FBR0csR0FBRyxDQUFDQSxJQUFJQyxNQUFNLEdBQUcsRUFBRTtJQUN4QztJQUNBLE9BQU9ELElBQUlRLFFBQVEsQ0FBQyxVQUFVTCxHQUFHSCxJQUFJQyxNQUFNLEdBQUdtQjtBQUNoRDtBQUVBLFNBQVM3QixVQUFVUyxHQUFHO0lBQ3BCLElBQUlFLElBQUlGLE9BQU9BLElBQUlDLE1BQU0sR0FBRyxJQUFJLENBQUNULEtBQUssQ0FBQ1EsT0FBTztJQUM5QyxJQUFJLElBQUksQ0FBQ0wsUUFBUSxFQUFFLE9BQU9PLElBQUksSUFBSSxDQUFDTCxRQUFRLENBQUNXLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUNiLFFBQVE7SUFDbkYsT0FBT087QUFDVDtBQUVBLDRFQUE0RTtBQUM1RSxTQUFTVCxZQUFZTyxHQUFHO0lBQ3RCLE9BQU9BLElBQUlRLFFBQVEsQ0FBQyxJQUFJLENBQUNuQyxRQUFRO0FBQ25DO0FBRUEsU0FBU3FCLFVBQVVNLEdBQUc7SUFDcEIsT0FBT0EsT0FBT0EsSUFBSUMsTUFBTSxHQUFHLElBQUksQ0FBQ1QsS0FBSyxDQUFDUSxPQUFPO0FBQy9DIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWRtaXNzaW9uLXVwbGlmdC8uL25vZGVfbW9kdWxlcy9zdHJpbmdfZGVjb2Rlci9saWIvc3RyaW5nX2RlY29kZXIuanM/ODJkMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKjxyZXBsYWNlbWVudD4qL1xuXG52YXIgQnVmZmVyID0gcmVxdWlyZSgnc2FmZS1idWZmZXInKS5CdWZmZXI7XG4vKjwvcmVwbGFjZW1lbnQ+Ki9cblxudmFyIGlzRW5jb2RpbmcgPSBCdWZmZXIuaXNFbmNvZGluZyB8fCBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgZW5jb2RpbmcgPSAnJyArIGVuY29kaW5nO1xuICBzd2l0Y2ggKGVuY29kaW5nICYmIGVuY29kaW5nLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOmNhc2UgJ3V0ZjgnOmNhc2UgJ3V0Zi04JzpjYXNlICdhc2NpaSc6Y2FzZSAnYmluYXJ5JzpjYXNlICdiYXNlNjQnOmNhc2UgJ3VjczInOmNhc2UgJ3Vjcy0yJzpjYXNlICd1dGYxNmxlJzpjYXNlICd1dGYtMTZsZSc6Y2FzZSAncmF3JzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9ub3JtYWxpemVFbmNvZGluZyhlbmMpIHtcbiAgaWYgKCFlbmMpIHJldHVybiAndXRmOCc7XG4gIHZhciByZXRyaWVkO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jKSB7XG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuICd1dGY4JztcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiAndXRmMTZsZSc7XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuICdsYXRpbjEnO1xuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBlbmM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAocmV0cmllZCkgcmV0dXJuOyAvLyB1bmRlZmluZWRcbiAgICAgICAgZW5jID0gKCcnICsgZW5jKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXRyaWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIERvIG5vdCBjYWNoZSBgQnVmZmVyLmlzRW5jb2RpbmdgIHdoZW4gY2hlY2tpbmcgZW5jb2RpbmcgbmFtZXMgYXMgc29tZVxuLy8gbW9kdWxlcyBtb25rZXktcGF0Y2ggaXQgdG8gc3VwcG9ydCBhZGRpdGlvbmFsIGVuY29kaW5nc1xuZnVuY3Rpb24gbm9ybWFsaXplRW5jb2RpbmcoZW5jKSB7XG4gIHZhciBuZW5jID0gX25vcm1hbGl6ZUVuY29kaW5nKGVuYyk7XG4gIGlmICh0eXBlb2YgbmVuYyAhPT0gJ3N0cmluZycgJiYgKEJ1ZmZlci5pc0VuY29kaW5nID09PSBpc0VuY29kaW5nIHx8ICFpc0VuY29kaW5nKGVuYykpKSB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmMpO1xuICByZXR1cm4gbmVuYyB8fCBlbmM7XG59XG5cbi8vIFN0cmluZ0RlY29kZXIgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGZvciBlZmZpY2llbnRseSBzcGxpdHRpbmcgYSBzZXJpZXMgb2Zcbi8vIGJ1ZmZlcnMgaW50byBhIHNlcmllcyBvZiBKUyBzdHJpbmdzIHdpdGhvdXQgYnJlYWtpbmcgYXBhcnQgbXVsdGktYnl0ZVxuLy8gY2hhcmFjdGVycy5cbmV4cG9ydHMuU3RyaW5nRGVjb2RlciA9IFN0cmluZ0RlY29kZXI7XG5mdW5jdGlvbiBTdHJpbmdEZWNvZGVyKGVuY29kaW5nKSB7XG4gIHRoaXMuZW5jb2RpbmcgPSBub3JtYWxpemVFbmNvZGluZyhlbmNvZGluZyk7XG4gIHZhciBuYjtcbiAgc3dpdGNoICh0aGlzLmVuY29kaW5nKSB7XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICB0aGlzLnRleHQgPSB1dGYxNlRleHQ7XG4gICAgICB0aGlzLmVuZCA9IHV0ZjE2RW5kO1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgICB0aGlzLmZpbGxMYXN0ID0gdXRmOEZpbGxMYXN0O1xuICAgICAgbmIgPSA0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHRoaXMudGV4dCA9IGJhc2U2NFRleHQ7XG4gICAgICB0aGlzLmVuZCA9IGJhc2U2NEVuZDtcbiAgICAgIG5iID0gMztcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aGlzLndyaXRlID0gc2ltcGxlV3JpdGU7XG4gICAgICB0aGlzLmVuZCA9IHNpbXBsZUVuZDtcbiAgICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgdGhpcy5sYXN0VG90YWwgPSAwO1xuICB0aGlzLmxhc3RDaGFyID0gQnVmZmVyLmFsbG9jVW5zYWZlKG5iKTtcbn1cblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmIChidWYubGVuZ3RoID09PSAwKSByZXR1cm4gJyc7XG4gIHZhciByO1xuICB2YXIgaTtcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHtcbiAgICByID0gdGhpcy5maWxsTGFzdChidWYpO1xuICAgIGlmIChyID09PSB1bmRlZmluZWQpIHJldHVybiAnJztcbiAgICBpID0gdGhpcy5sYXN0TmVlZDtcbiAgICB0aGlzLmxhc3ROZWVkID0gMDtcbiAgfSBlbHNlIHtcbiAgICBpID0gMDtcbiAgfVxuICBpZiAoaSA8IGJ1Zi5sZW5ndGgpIHJldHVybiByID8gciArIHRoaXMudGV4dChidWYsIGkpIDogdGhpcy50ZXh0KGJ1ZiwgaSk7XG4gIHJldHVybiByIHx8ICcnO1xufTtcblxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZW5kID0gdXRmOEVuZDtcblxuLy8gUmV0dXJucyBvbmx5IGNvbXBsZXRlIGNoYXJhY3RlcnMgaW4gYSBCdWZmZXJcblN0cmluZ0RlY29kZXIucHJvdG90eXBlLnRleHQgPSB1dGY4VGV4dDtcblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBwYXJ0aWFsIG5vbi1VVEYtOCBjaGFyYWN0ZXIgdXNpbmcgYnl0ZXMgZnJvbSBhIEJ1ZmZlclxuU3RyaW5nRGVjb2Rlci5wcm90b3R5cGUuZmlsbExhc3QgPSBmdW5jdGlvbiAoYnVmKSB7XG4gIGlmICh0aGlzLmxhc3ROZWVkIDw9IGJ1Zi5sZW5ndGgpIHtcbiAgICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIHRoaXMubGFzdE5lZWQpO1xuICAgIHJldHVybiB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKHRoaXMuZW5jb2RpbmcsIDAsIHRoaXMubGFzdFRvdGFsKTtcbiAgfVxuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59O1xuXG4vLyBDaGVja3MgdGhlIHR5cGUgb2YgYSBVVEYtOCBieXRlLCB3aGV0aGVyIGl0J3MgQVNDSUksIGEgbGVhZGluZyBieXRlLCBvciBhXG4vLyBjb250aW51YXRpb24gYnl0ZS4gSWYgYW4gaW52YWxpZCBieXRlIGlzIGRldGVjdGVkLCAtMiBpcyByZXR1cm5lZC5cbmZ1bmN0aW9uIHV0ZjhDaGVja0J5dGUoYnl0ZSkge1xuICBpZiAoYnl0ZSA8PSAweDdGKSByZXR1cm4gMDtlbHNlIGlmIChieXRlID4+IDUgPT09IDB4MDYpIHJldHVybiAyO2Vsc2UgaWYgKGJ5dGUgPj4gNCA9PT0gMHgwRSkgcmV0dXJuIDM7ZWxzZSBpZiAoYnl0ZSA+PiAzID09PSAweDFFKSByZXR1cm4gNDtcbiAgcmV0dXJuIGJ5dGUgPj4gNiA9PT0gMHgwMiA/IC0xIDogLTI7XG59XG5cbi8vIENoZWNrcyBhdCBtb3N0IDMgYnl0ZXMgYXQgdGhlIGVuZCBvZiBhIEJ1ZmZlciBpbiBvcmRlciB0byBkZXRlY3QgYW5cbi8vIGluY29tcGxldGUgbXVsdGktYnl0ZSBVVEYtOCBjaGFyYWN0ZXIuIFRoZSB0b3RhbCBudW1iZXIgb2YgYnl0ZXMgKDIsIDMsIG9yIDQpXG4vLyBuZWVkZWQgdG8gY29tcGxldGUgdGhlIFVURi04IGNoYXJhY3RlciAoaWYgYXBwbGljYWJsZSkgYXJlIHJldHVybmVkLlxuZnVuY3Rpb24gdXRmOENoZWNrSW5jb21wbGV0ZShzZWxmLCBidWYsIGkpIHtcbiAgdmFyIGogPSBidWYubGVuZ3RoIC0gMTtcbiAgaWYgKGogPCBpKSByZXR1cm4gMDtcbiAgdmFyIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHNlbGYubGFzdE5lZWQgPSBuYiAtIDE7XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIGlmICgtLWogPCBpIHx8IG5iID09PSAtMikgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHNlbGYubGFzdE5lZWQgPSBuYiAtIDI7XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIGlmICgtLWogPCBpIHx8IG5iID09PSAtMikgcmV0dXJuIDA7XG4gIG5iID0gdXRmOENoZWNrQnl0ZShidWZbal0pO1xuICBpZiAobmIgPj0gMCkge1xuICAgIGlmIChuYiA+IDApIHtcbiAgICAgIGlmIChuYiA9PT0gMikgbmIgPSAwO2Vsc2Ugc2VsZi5sYXN0TmVlZCA9IG5iIC0gMztcbiAgICB9XG4gICAgcmV0dXJuIG5iO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG4vLyBWYWxpZGF0ZXMgYXMgbWFueSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgbXVsdGktYnl0ZSBVVEYtOCBjaGFyYWN0ZXIgYXNcbi8vIG5lZWRlZCBvciBhcmUgYXZhaWxhYmxlLiBJZiB3ZSBzZWUgYSBub24tY29udGludWF0aW9uIGJ5dGUgd2hlcmUgd2UgZXhwZWN0XG4vLyBvbmUsIHdlIFwicmVwbGFjZVwiIHRoZSB2YWxpZGF0ZWQgY29udGludWF0aW9uIGJ5dGVzIHdlJ3ZlIHNlZW4gc28gZmFyIHdpdGhcbi8vIGEgc2luZ2xlIFVURi04IHJlcGxhY2VtZW50IGNoYXJhY3RlciAoJ1xcdWZmZmQnKSwgdG8gbWF0Y2ggdjgncyBVVEYtOCBkZWNvZGluZ1xuLy8gYmVoYXZpb3IuIFRoZSBjb250aW51YXRpb24gYnl0ZSBjaGVjayBpcyBpbmNsdWRlZCB0aHJlZSB0aW1lcyBpbiB0aGUgY2FzZVxuLy8gd2hlcmUgYWxsIG9mIHRoZSBjb250aW51YXRpb24gYnl0ZXMgZm9yIGEgY2hhcmFjdGVyIGV4aXN0IGluIHRoZSBzYW1lIGJ1ZmZlci5cbi8vIEl0IGlzIGFsc28gZG9uZSB0aGlzIHdheSBhcyBhIHNsaWdodCBwZXJmb3JtYW5jZSBpbmNyZWFzZSBpbnN0ZWFkIG9mIHVzaW5nIGFcbi8vIGxvb3AuXG5mdW5jdGlvbiB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHNlbGYsIGJ1ZiwgcCkge1xuICBpZiAoKGJ1ZlswXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgc2VsZi5sYXN0TmVlZCA9IDA7XG4gICAgcmV0dXJuICdcXHVmZmZkJztcbiAgfVxuICBpZiAoc2VsZi5sYXN0TmVlZCA+IDEgJiYgYnVmLmxlbmd0aCA+IDEpIHtcbiAgICBpZiAoKGJ1ZlsxXSAmIDB4QzApICE9PSAweDgwKSB7XG4gICAgICBzZWxmLmxhc3ROZWVkID0gMTtcbiAgICAgIHJldHVybiAnXFx1ZmZmZCc7XG4gICAgfVxuICAgIGlmIChzZWxmLmxhc3ROZWVkID4gMiAmJiBidWYubGVuZ3RoID4gMikge1xuICAgICAgaWYgKChidWZbMl0gJiAweEMwKSAhPT0gMHg4MCkge1xuICAgICAgICBzZWxmLmxhc3ROZWVkID0gMjtcbiAgICAgICAgcmV0dXJuICdcXHVmZmZkJztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gQXR0ZW1wdHMgdG8gY29tcGxldGUgYSBtdWx0aS1ieXRlIFVURi04IGNoYXJhY3RlciB1c2luZyBieXRlcyBmcm9tIGEgQnVmZmVyLlxuZnVuY3Rpb24gdXRmOEZpbGxMYXN0KGJ1Zikge1xuICB2YXIgcCA9IHRoaXMubGFzdFRvdGFsIC0gdGhpcy5sYXN0TmVlZDtcbiAgdmFyIHIgPSB1dGY4Q2hlY2tFeHRyYUJ5dGVzKHRoaXMsIGJ1ZiwgcCk7XG4gIGlmIChyICE9PSB1bmRlZmluZWQpIHJldHVybiByO1xuICBpZiAodGhpcy5sYXN0TmVlZCA8PSBidWYubGVuZ3RoKSB7XG4gICAgYnVmLmNvcHkodGhpcy5sYXN0Q2hhciwgcCwgMCwgdGhpcy5sYXN0TmVlZCk7XG4gICAgcmV0dXJuIHRoaXMubGFzdENoYXIudG9TdHJpbmcodGhpcy5lbmNvZGluZywgMCwgdGhpcy5sYXN0VG90YWwpO1xuICB9XG4gIGJ1Zi5jb3B5KHRoaXMubGFzdENoYXIsIHAsIDAsIGJ1Zi5sZW5ndGgpO1xuICB0aGlzLmxhc3ROZWVkIC09IGJ1Zi5sZW5ndGg7XG59XG5cbi8vIFJldHVybnMgYWxsIGNvbXBsZXRlIFVURi04IGNoYXJhY3RlcnMgaW4gYSBCdWZmZXIuIElmIHRoZSBCdWZmZXIgZW5kZWQgb24gYVxuLy8gcGFydGlhbCBjaGFyYWN0ZXIsIHRoZSBjaGFyYWN0ZXIncyBieXRlcyBhcmUgYnVmZmVyZWQgdW50aWwgdGhlIHJlcXVpcmVkXG4vLyBudW1iZXIgb2YgYnl0ZXMgYXJlIGF2YWlsYWJsZS5cbmZ1bmN0aW9uIHV0ZjhUZXh0KGJ1ZiwgaSkge1xuICB2YXIgdG90YWwgPSB1dGY4Q2hlY2tJbmNvbXBsZXRlKHRoaXMsIGJ1ZiwgaSk7XG4gIGlmICghdGhpcy5sYXN0TmVlZCkgcmV0dXJuIGJ1Zi50b1N0cmluZygndXRmOCcsIGkpO1xuICB0aGlzLmxhc3RUb3RhbCA9IHRvdGFsO1xuICB2YXIgZW5kID0gYnVmLmxlbmd0aCAtICh0b3RhbCAtIHRoaXMubGFzdE5lZWQpO1xuICBidWYuY29weSh0aGlzLmxhc3RDaGFyLCAwLCBlbmQpO1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGY4JywgaSwgZW5kKTtcbn1cblxuLy8gRm9yIFVURi04LCBhIHJlcGxhY2VtZW50IGNoYXJhY3RlciBpcyBhZGRlZCB3aGVuIGVuZGluZyBvbiBhIHBhcnRpYWxcbi8vIGNoYXJhY3Rlci5cbmZ1bmN0aW9uIHV0ZjhFbmQoYnVmKSB7XG4gIHZhciByID0gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbiAgaWYgKHRoaXMubGFzdE5lZWQpIHJldHVybiByICsgJ1xcdWZmZmQnO1xuICByZXR1cm4gcjtcbn1cblxuLy8gVVRGLTE2TEUgdHlwaWNhbGx5IG5lZWRzIHR3byBieXRlcyBwZXIgY2hhcmFjdGVyLCBidXQgZXZlbiBpZiB3ZSBoYXZlIGFuIGV2ZW5cbi8vIG51bWJlciBvZiBieXRlcyBhdmFpbGFibGUsIHdlIG5lZWQgdG8gY2hlY2sgaWYgd2UgZW5kIG9uIGEgbGVhZGluZy9oaWdoXG4vLyBzdXJyb2dhdGUuIEluIHRoYXQgY2FzZSwgd2UgbmVlZCB0byB3YWl0IGZvciB0aGUgbmV4dCB0d28gYnl0ZXMgaW4gb3JkZXIgdG9cbi8vIGRlY29kZSB0aGUgbGFzdCBjaGFyYWN0ZXIgcHJvcGVybHkuXG5mdW5jdGlvbiB1dGYxNlRleHQoYnVmLCBpKSB7XG4gIGlmICgoYnVmLmxlbmd0aCAtIGkpICUgMiA9PT0gMCkge1xuICAgIHZhciByID0gYnVmLnRvU3RyaW5nKCd1dGYxNmxlJywgaSk7XG4gICAgaWYgKHIpIHtcbiAgICAgIHZhciBjID0gci5jaGFyQ29kZUF0KHIubGVuZ3RoIC0gMSk7XG4gICAgICBpZiAoYyA+PSAweEQ4MDAgJiYgYyA8PSAweERCRkYpIHtcbiAgICAgICAgdGhpcy5sYXN0TmVlZCA9IDI7XG4gICAgICAgIHRoaXMubGFzdFRvdGFsID0gNDtcbiAgICAgICAgdGhpcy5sYXN0Q2hhclswXSA9IGJ1ZltidWYubGVuZ3RoIC0gMl07XG4gICAgICAgIHRoaXMubGFzdENoYXJbMV0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gci5zbGljZSgwLCAtMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByO1xuICB9XG4gIHRoaXMubGFzdE5lZWQgPSAxO1xuICB0aGlzLmxhc3RUb3RhbCA9IDI7XG4gIHRoaXMubGFzdENoYXJbMF0gPSBidWZbYnVmLmxlbmd0aCAtIDFdO1xuICByZXR1cm4gYnVmLnRvU3RyaW5nKCd1dGYxNmxlJywgaSwgYnVmLmxlbmd0aCAtIDEpO1xufVxuXG4vLyBGb3IgVVRGLTE2TEUgd2UgZG8gbm90IGV4cGxpY2l0bHkgYXBwZW5kIHNwZWNpYWwgcmVwbGFjZW1lbnQgY2hhcmFjdGVycyBpZiB3ZVxuLy8gZW5kIG9uIGEgcGFydGlhbCBjaGFyYWN0ZXIsIHdlIHNpbXBseSBsZXQgdjggaGFuZGxlIHRoYXQuXG5mdW5jdGlvbiB1dGYxNkVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkge1xuICAgIHZhciBlbmQgPSB0aGlzLmxhc3RUb3RhbCAtIHRoaXMubGFzdE5lZWQ7XG4gICAgcmV0dXJuIHIgKyB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKCd1dGYxNmxlJywgMCwgZW5kKTtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuZnVuY3Rpb24gYmFzZTY0VGV4dChidWYsIGkpIHtcbiAgdmFyIG4gPSAoYnVmLmxlbmd0aCAtIGkpICUgMztcbiAgaWYgKG4gPT09IDApIHJldHVybiBidWYudG9TdHJpbmcoJ2Jhc2U2NCcsIGkpO1xuICB0aGlzLmxhc3ROZWVkID0gMyAtIG47XG4gIHRoaXMubGFzdFRvdGFsID0gMztcbiAgaWYgKG4gPT09IDEpIHtcbiAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxhc3RDaGFyWzBdID0gYnVmW2J1Zi5sZW5ndGggLSAyXTtcbiAgICB0aGlzLmxhc3RDaGFyWzFdID0gYnVmW2J1Zi5sZW5ndGggLSAxXTtcbiAgfVxuICByZXR1cm4gYnVmLnRvU3RyaW5nKCdiYXNlNjQnLCBpLCBidWYubGVuZ3RoIC0gbik7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NEVuZChidWYpIHtcbiAgdmFyIHIgPSBidWYgJiYgYnVmLmxlbmd0aCA/IHRoaXMud3JpdGUoYnVmKSA6ICcnO1xuICBpZiAodGhpcy5sYXN0TmVlZCkgcmV0dXJuIHIgKyB0aGlzLmxhc3RDaGFyLnRvU3RyaW5nKCdiYXNlNjQnLCAwLCAzIC0gdGhpcy5sYXN0TmVlZCk7XG4gIHJldHVybiByO1xufVxuXG4vLyBQYXNzIGJ5dGVzIG9uIHRocm91Z2ggZm9yIHNpbmdsZS1ieXRlIGVuY29kaW5ncyAoZS5nLiBhc2NpaSwgbGF0aW4xLCBoZXgpXG5mdW5jdGlvbiBzaW1wbGVXcml0ZShidWYpIHtcbiAgcmV0dXJuIGJ1Zi50b1N0cmluZyh0aGlzLmVuY29kaW5nKTtcbn1cblxuZnVuY3Rpb24gc2ltcGxlRW5kKGJ1Zikge1xuICByZXR1cm4gYnVmICYmIGJ1Zi5sZW5ndGggPyB0aGlzLndyaXRlKGJ1ZikgOiAnJztcbn0iXSwibmFtZXMiOlsiQnVmZmVyIiwicmVxdWlyZSIsImlzRW5jb2RpbmciLCJlbmNvZGluZyIsInRvTG93ZXJDYXNlIiwiX25vcm1hbGl6ZUVuY29kaW5nIiwiZW5jIiwicmV0cmllZCIsIm5vcm1hbGl6ZUVuY29kaW5nIiwibmVuYyIsIkVycm9yIiwiZXhwb3J0cyIsIlN0cmluZ0RlY29kZXIiLCJuYiIsInRleHQiLCJ1dGYxNlRleHQiLCJlbmQiLCJ1dGYxNkVuZCIsImZpbGxMYXN0IiwidXRmOEZpbGxMYXN0IiwiYmFzZTY0VGV4dCIsImJhc2U2NEVuZCIsIndyaXRlIiwic2ltcGxlV3JpdGUiLCJzaW1wbGVFbmQiLCJsYXN0TmVlZCIsImxhc3RUb3RhbCIsImxhc3RDaGFyIiwiYWxsb2NVbnNhZmUiLCJwcm90b3R5cGUiLCJidWYiLCJsZW5ndGgiLCJyIiwiaSIsInVuZGVmaW5lZCIsInV0ZjhFbmQiLCJ1dGY4VGV4dCIsImNvcHkiLCJ0b1N0cmluZyIsInV0ZjhDaGVja0J5dGUiLCJieXRlIiwidXRmOENoZWNrSW5jb21wbGV0ZSIsInNlbGYiLCJqIiwidXRmOENoZWNrRXh0cmFCeXRlcyIsInAiLCJ0b3RhbCIsImMiLCJjaGFyQ29kZUF0Iiwic2xpY2UiLCJuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/string_decoder/lib/string_decoder.js\n");

/***/ })

};
;