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
        addItem: async (parent, { input }, context, info) => {
            let item = {};
            let error = {};
            try {
                const newItem = await new TestModel_1.TestModel({
                    title: input.title,
                    desc: input.desc,
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
                    message: error.message,
                },
            };
        },
        updateItem: async (parent, { input, id }, context, info) => {
            let error = {};
            const updatedChat = await TestModel_1.TestModel.findByIdAndUpdate({ _id: id }, { title: input.title, desc: input.desc }, { new: true })
                .catch(e => {
                console.log("is delete error ======", e);
                error = e;
            });
            return {
                item: updatedChat,
                error: {
                    message: error.message,
                },
            };
        },
        deleteItem: async (parent, { input, id }, context, info) => {
            let error = {};
            const updatedChat = await TestModel_1.TestModel.findByIdAndDelete({ _id: id })
                .catch(e => {
                console.log("is delete error ======", e);
                error = e;
                return false;
            });
            return true;
        },
    },
};
//# sourceMappingURL=TestResolver.js.map