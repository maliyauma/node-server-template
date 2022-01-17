import { gql } from 'apollo-server-express';


export const typeDefs = 
gql`
input ItemInput {
  title: String
  desc: String
}
input PersonInput{
  name:String,
  age:Int,
  gender:String,

}
type Hello{
  name:String,
  status:String
}
type ShortList{
clients:[Person],
limit:Int,
page:Int
}
type Person{
  id:String
  name:String,
  age:Int,
  gender:String,

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
  type PagOpt{
  totalDocs: Int,
  limit: Int,
  page: Int,
  totalPages: Int,
  pagingCounter: Int,
  hasPrevPage: Boolean,
  hasNextPage: Boolean,
  prevPage: Int,
  nextPage: Int
   }
   type PagedItemResponse{
     items:[Item],
     pagopt:PagOpt

   }
    type Query {
      hello:Hello,
      person(limit: Int,page:Int):ShortList,
      items:[Item]
      getPagItem(page:Int,limit:Int):PagedItemResponse
      getPagItems2(page:Int, limit:Int):[Item]
  
     },

     type Mutation{
      addItem(input:ItemInput):ItemResponse
      updateItem(input:ItemInput,id:ID):ItemResponse
      deleteItem(id:ID):Boolean
      addPerson(input:PersonInput):Person

     }


`;