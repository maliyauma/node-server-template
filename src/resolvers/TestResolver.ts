import { dummy_persons, TestModel,PersonModel } from "./../model/TestModel";

export const resolvers = {
  Query: {
    person:async(parent, {limit=3,page=0}, context, info)=>{
    //@ts-ignore
    const myAggregate = PersonModel.aggregate();
    const options = {
      page: page,
      limit: limit,
    };
    let persons=[]
    let pagopt={}
     //@ts-ignore
    await PersonModel.aggregatePaginate(myAggregate, options)
    .then((results)=>{
      // console.log("results in then ======== ",results);
      const{ docs, totalDocs, limit,  page, totalPages ,pagingCounter,
        hasPrevPage, hasNextPage, prevPage,  nextPage}=results
     persons=docs
      
      pagopt={  totalDocs,limit,page,totalPages,pagingCounter,
        hasPrevPage,hasNextPage,prevPage,nextPage
      }
    })
    .catch(function (err) {
      console.log("agregaed resultsresults ======== ",err);
    });
    // console.log("person returned is ======= ",persons)

  const fiexdarr=[]
    persons?.map((item)=>{
       const newobj={
         //@ts-ignore 
         id:item._id,name:item.name,age:item.age,gender:item.gender
       }
    //@ts-ignore 
     fiexdarr.push(newobj)
     })
     console.log("+++++++++++query page ===  ",page,"fixedarray+++++++++++++",fiexdarr);
     const listy={
      clients:fiexdarr,
      clerk:"bozyo",
      rank:"grinder",
      limit:3,
       //@ts-ignore 
      page:pagopt.page
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
    addPerson: async (parent, { input}, context, info) => {
      let item = {};
  
      try {
        const newItem = await new PersonModel({
          name:input.name,
          age:input.age,
          gender:input.gender,
          
        });
        item = await newItem.save();
        console.log("item  ==== ", item);
      } catch (e) {
        console.log("addTest error response =====", e.message);
       
      }
      return item
 

    },
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
