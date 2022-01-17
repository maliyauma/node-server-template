import { dummy_persons, TestModel } from "./../model/TestModel";

export const resolvers = {
  Query: {
    person:async(parent, {limit=3,page=0}, context, info)=>{
    //@ts-ignore
     const alist=dummy_persons.slice(page,limit)
     console.log("fetch page is ===== ",alist)
     const listy={
      clients:alist,
      clerk:"bozyo",
      rank:"grinder",
      limit:3,
      page:page
    }
    return listy
    },
    hello: () => {
     return{name:"daddy",status:"eat your vegetables"}
    },
    items: async () => {
      const chats = await TestModel.find({});
      console.log("+++++++++++query executed+++++++++++++");
      return chats;
    },
       //@ts-ignore
    getPagItem: async(parent, {page,limit}, context, info)=>{
      console.log(" the args are page/limit:",page, limit)
      const myAggregate = TestModel.aggregate();
      const options = {
        page: page,
        limit: limit,
      };
      let items=[]
      let pagopt={}
       //@ts-ignore
      await TestModel.aggregatePaginate(myAggregate, options)
      .then((results)=>{
        console.log("results in then ======== ",results);
        const{
          docs,
          totalDocs,
          limit,
          page,
          totalPages,
          pagingCounter,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage
        }=results

      
        items=docs
        
        pagopt={
          totalDocs,
          limit,
          page,
          totalPages,
          pagingCounter,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage
        }
      })
      .catch(function (err) {
        console.log("agregaed resultsresults ======== ",err);
      });
      // console.log("returning items ========  ",items)
      return {
        items,
        pagopt
     };
    },
    getPagItems2: async(parent, {page,limit}, context, info)=>{
      console.log("skipping to page ========= ",page,"   limit to    ======",limit)
      const myAggregate = TestModel.aggregate();
      const options = {
        page: page,
        limit: limit,
      };
      let items=[]
    
       //@ts-ignore
      await TestModel.aggregatePaginate(myAggregate, options)
      .then((results)=>{
        console.log("agregaed resultsresults ======== ",results);
        const{
          docs,
         }=results
                
      
        
        items=docs
        

      })
      .catch(function (err) {
        console.log("agregaed resultsresults ======== ",err);
      });
      console.log("destrucured docs ========  ",items)
      return items;
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
