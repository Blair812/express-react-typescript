"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route_1 = __importDefault(require("./route"));
const dbConfigs_1 = __importDefault(require("./dbConfigs"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
dbConfigs_1.default.dbConnection();
app.use(express_1.default.static('dist'));
app.get('/', (req, res) => {
    res.sendFile('/dist/index.html');
});
const routes = Object.values(route_1.default);
app.use('/api', routes);
const port = Number(process.env.PORT) || 8050;
app.listen(port);
console.log(`App listening on ${port}`);
//# sourceMappingURL=index.js.map