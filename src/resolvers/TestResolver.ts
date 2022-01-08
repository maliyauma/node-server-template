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
    addItem: async (parent, { input}, context, info) => {
      let item = {};
      let error = {};
      try {
        const newItem = await new TestModel({
          title:input.title,
          desc:input.desc,
        });
        item = await newItem.save();
        console.log("item  ==== ", item);
      } catch (e) {
        console.log("addTest error response =====", e.message);
        error = e;
      }
      return {
        item: item,
        error: {
          //@ts-ignore
          message: error.message,
        },
      };
    },

    //update by id
       updateItem: async (parent, { input,id}, context, info) => {
       let error = {};
        const updatedChat= await TestModel.findByIdAndUpdate(
          {_id:id},
          { title:input.title,desc:input.desc}, 
          {new: true}
        )
        .catch(e=>{
          console.log("is delete error ======",e)
          error=e
         })
        return {
          item: updatedChat,
          error: {
            //@ts-ignore
            message: error.message,
          },
        };
      },
      deleteItem: async (parent, { input,id}, context, info) => {
        let error = {};
         const updatedChat= await TestModel.findByIdAndDelete(
           {_id:id},
         )
         .catch(e=>{
           console.log("is delete error ======",e)
           error=e
           return false
          })
         return true
       },
  },
};
