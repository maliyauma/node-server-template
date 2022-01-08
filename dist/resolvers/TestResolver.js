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
        }
    },
    Mutation: {
        addItem: async (parent, { title, desc }, context, info) => {
            const newItem = await new TestModel_1.TestModel({
                title,
                desc
            });
            await newItem.save()
                .then(e => {
                console.log("addTest response =====", e);
            })
                .catch(e => {
                console.log("addTest error response =====", e);
            });
            return newItem;
        }
    }
};
//# sourceMappingURL=TestResolver.js.map