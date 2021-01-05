const express=require("express");
const Item=require("./models/items")
const app=express();
const mongoose=require("mongoose")

app.use(express.urlencoded({extended:true}))

const mongodb="mongodb+srv://to-do:Abhay123@cluster0.gyv2u.mongodb.net/todo-database?retryWrites=true&w=majority"

mongoose.connect(mongodb,{ useNewUrlParser: true,useUnifiedTopology: true }).then(()=>{
    console.log("connected")
    app.listen(3000)
}).catch(err=>console.log(err))

app.set('view engine','ejs');



app.get("/",(req,res)=>{
   res.redirect("/get-item")
})

app.get("/get-item",(req,res)=>{
    Item.find().then(result=>{
        res.render('index',{items:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

app.get("/add-item",(req,res)=>{
    res.render("add-item")
})

app.post("/items",(req,res)=>{
    
    const item=Item(req.body)
    item.save().then(()=>{
        res.redirect("/get-item")
    }).catch(err=>{
        console.log(err)
    })

})

app.get("/items/:id",(req,res)=>{
    
    const id=req.params.id;
    Item.findById(id).then(result=>{
        
        res.render("item-detail",{item:result})
    })
})

app.delete("/items/:id",(req,res)=>{
    const id=req.params.id;
    Item.findByIdAndDelete(id).then(result=>{
        res.json({msg:"Delete Successfully"})

    })
})

app.put("/items/:id",(req,res)=>{
    const id=req.params.id;
    Item.findByIdAndUpdate(id,req.body).then(result=>{
        res.json({msg:"Updated Successfully"})
    })
})

app.use((req,res)=>{
    res.render("error")
})
