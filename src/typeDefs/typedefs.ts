import { gql } from 'apollo-server-express';

export const typeDefs = 
gql`
input ItemInput {
  title: String
  desc: String
}
type Item{
    title:String,
    desc:String,
    testNo:Int
    id:ID
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
      addItem(input:ItemInput):ItemResponse
      updateItem(input:ItemInput,id:ID):ItemResponse
      deleteItem(id:ID):Boolean
     }


`;