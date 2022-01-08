"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const TestModel_1 = require("./../model/TestModel");
exports.resolvers = {
    Query: {
        defaultPost: () => "eat your vegetables",
        getItems: async () => {
            const chats = await TestModel_1.TestModel.find({});
            console.log("holt output ======", chats);
            return chats;
        },
    },
    Mutation: {
        addItem: async (parent, { title, desc }, context, info) => {
            let item = {};
            let error = {};
            try {
                const newItem = await new TestModel_1.TestModel({
                    title,
                    desc,
                });
                item = await newItem.save();
                console.log("item  ==== ", item);
            }
            catch (e) {
                console.log("addTest error response =====", e.message);
                error = e;
            }
            return {
                item: item,
                error: {
                    message: error.message
                }
            };
        },
    },
};
//# sourceMappingURL=TestResolver.js.map