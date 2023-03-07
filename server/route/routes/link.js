"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../router"));
const models_1 = require("../../models");
const shortIdGen_1 = require("../../untils/shortIdGen");
const url_1 = __importDefault(require("url"));
router_1.default.route('/link')
    .post(async (req, res) => {
    const { longLink, shortLink } = req.body;
    if (shortLink) {
        // 有短链接，则直接获取长链接返回
        const oneObj = await models_1.Test.findOne({ shortLink });
        if (oneObj) {
            res.status(202).json(oneObj);
        }
        else {
            const error = {
                status: 500,
                message: "数据异常!"
            };
            res.status(error.status).json({ message: error.message });
        }
        return;
    }
    else {
        // 根据长链接查询是否有短链接，有则返回。
        const oneObj = await models_1.Test.findOne({ longLink });
        if (oneObj) {
            res.status(202).json(oneObj);
            return;
        }
        // 没则生成短链接并入库。然后，返回短链接。
        // 生成短链接path
        // 校验url合法性
        const { protocol, host, port } = url_1.default.parse(longLink);
        if (!protocol || !host) {
            // 长链接不合法
            res.status(500).json({ message: "长链接格式不对" });
        }
        else {
            const shortPath = (0, shortIdGen_1.generate)(1, 8);
            const _port = port ? `:${port}` : '';
            const _shortLink = `${protocol}//${host}${_port}/${shortPath}`;
            const Text = new models_1.Test({ longLink, shortLink: _shortLink });
            try {
                const savedText = await Text.save();
                res.status(201).json(savedText);
            }
            catch (e) {
                const error = {
                    status: 500,
                    message: "有异常!"
                };
                console.error(e);
                res.status(error.status).json({ message: "有异常" });
            }
        }
    }
});
exports.default = router_1.default;
//# sourceMappingURL=link.js.map