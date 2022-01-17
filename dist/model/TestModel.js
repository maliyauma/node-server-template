"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummy_persons = exports.TestModel = void 0;
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
exports.dummy_persons = [
    { id: 1, name: "monday", age: 20, gender: "Male" },
    { id: 2, name: "tuesday", age: 21, gender: "Male" },
    { id: 3, name: "Wednesday", age: 22, gender: "Male" },
    { id: 4, name: "Thursday", age: 23, gender: "Male" },
    { id: 5, name: "Friday", age: 24, gender: "Male" },
    { id: 6, name: "Saturday", age: 25, gender: "Male" },
    { id: 7, name: "Sunday", age: 26, gender: "Male" },
];
//# sourceMappingURL=TestModel.js.map