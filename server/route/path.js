"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function path(url) {
    const allRoutes = {
        "/link": {
            methods: ["POST", "GET", "PUT", "DELETE"]
        }
    };
    return allRoutes[url];
}
exports.default = path;
//# sourceMappingURL=path.js.map