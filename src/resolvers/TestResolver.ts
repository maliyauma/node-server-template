import { TestModel } from './../model/TestModel';
export const resolvers = {

    Query: {
      defaultPost: () => "eat your vegetables",
      getItems:  async()=>{
        const chats=await TestModel.find({})
        console.log("holt output ======",chats)    
        return chats
      }
    },
    Mutation:{
        //shape of params (parent,args, context, info)
        addItem: async(parent,{ title,desc }, context, info)=>{
            const newItem = await new TestModel({
                title,
                desc
           })

           await newItem.save()
           .then(e=>{
               console.log("addTest response =====",e)
           })
           .catch(e=>{
            console.log("addTest error response =====",e)

        })
        return newItem
        }
    }

  };