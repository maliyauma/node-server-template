import { TestModel } from "./../model/TestModel";
export const resolvers = {
  Query: {
    defaultPost: () => "eat your vegetables",
    getItems: async () => {
      const chats = await TestModel.find({});
      console.log("holt output ======", chats);
      return chats;
    },
  },
  Mutation: {
    //shape of params (parent,args, context, info)
    addItem: async (parent, { title, desc }, context, info) => {
   let item={}
   let error={}     
   try{
      const newItem = await new TestModel({
        title,
        desc,
      });
   item=await newItem.save()
    console.log("item  ==== ",item)

    }catch(e){
    console.log("addTest error response =====", e.message);
    error=e
           }
    return {
            item:item,
            error:{
           //@ts-ignore
            message:error.message
            }
          };
    
 

 },
  },
};
