"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_auto_increment_1 = __importDefault(require("mongoose-auto-increment"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const uri = "mongodb://localhost:27017/testmongo";
const connection = mongoose_1.default.createConnection(uri);
mongoose_auto_increment_1.default.initialize(connection);
const Schema = mongoose_1.default.Schema;
const TestSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    testNo: {
        type: Number,
        required: true
    },
}, { timestamps: true });
TestSchema.plugin(mongoose_auto_increment_1.default.plugin, { model: 'Test', field: 'testNo' });
TestSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.TestModel = mongoose_1.default.model("Test", TestSchema);
//# sourceMappingURL=TestModel.js.map