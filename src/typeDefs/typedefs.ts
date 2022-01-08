import { gql } from 'apollo-server-express';

export const typeDefs = 
gql`type Item{
    title:String,
    desc:String
}
    type Query {
      defaultPost:String,
      getItems:[Item]
     },

     type Mutation{
      addItem(title:String,desc:String):Item
     }


`;