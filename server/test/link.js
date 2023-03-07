"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("should");
const shortIdGen_js_1 = require("../untils/shortIdGen.js");
describe('获取短链接path', function () {
    it('输出端链接path', function () {
        (0, shortIdGen_js_1.generate)(1, 8).should.be.not.empty();
    });
});
//# sourceMappingURL=link.js.map