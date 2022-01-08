"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `type Item{
    title:String,
    desc:String
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
     },

     type Mutation{
      addItem(title:String,desc:String):ItemResponse
     }


`;
//# sourceMappingURL=typedefs.js.map