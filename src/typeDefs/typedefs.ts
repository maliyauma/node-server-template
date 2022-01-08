import { gql } from 'apollo-server-express';

export const typeDefs = 
gql`type Item{
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