"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
input ItemInput {
  title: String
  desc: String
}
type Item{
    title:String,
    desc:String,
    testNo:Int
    _id:ID
   }
   type Error{
   message:String
   }
   type ItemResponse{
    item:Item
    error:Error
   }
    type Query {
      defaultPost:String,
      getItems:[Item]
      getPagItem(page:Int,limit:Int):[Item]
     },

     type Mutation{
      addItem(input:ItemInput):ItemResponse
      updateItem(input:ItemInput,id:ID):ItemResponse
      deleteItem(id:ID):Boolean

     }


`;
//# sourceMappingURL=typedefs.js.map