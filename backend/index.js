const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors())

app.use(express.json())

const connect = ()=>{
    return mongoose.connect(
        "mongodb+srv://web14shop:web14@cluster0.bvdwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
}
const todoSchema = new mongoose.Schema({
    Name:{type:String,required:true},
    status:{type:String,default:'false'},
    },
    {
    versionKey:false,
    timestamps: true
  });

const Todo =new mongoose.model("todos",todoSchema);
// routing

app.get('/todos',async(req,res)=>{
    console.log('get todos',req.body)
    const todos = await Todo.find().lean().exec();
    return res.status(200).send(todos);
})

app.get('/todos/:id',async(req,res)=>{
    console.log('get todos',req.params.id)
    const todos = await Todo.findById(req.params.id).lean().exec();
    return res.status(200).send(todos);
})

app.get('/alltodos',async(req,res)=>{
    const page = req.query.search;
    console.log('get todos',page);
    // const todos = await Todo.findById(req.params.id).lean().exec();
    return res.status(200).send("up");
})

app.patch('/todos/:id',async(req,res)=>{
    console.log('get todos',req.params.id)
    const todos = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).send(todos);
})

app.delete('/todos/:id',async(req,res)=>{
    console.log('get todos',req.params.id)
    const todos = await Todo.findByIdAndDelete(req.params.id);
    return res.status(200).send(todos);
})

app.post("/todos",async(req,res)=>{
    try {
        console.log(req.body);
        const todos = await Todo.create(req.body);
        return res.status(200).send(todos);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(process.env.PORT || 2345, async()=>{
    await connect();
    console.log('listenig on port',process.env.PORT || '2345')
})

