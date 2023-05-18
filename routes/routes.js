const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const items_model = require('../models/items.js');

// ---------- APIs ------------- //

// get all documents
router.get('/get', async(req,res)=>{
    try{
        const data = await items_model.find();
        if(data){
            res.status(201).json({msg:"success",data})
        }
        else{
            res.json({msg:"error"})
        }
    }
    catch(error){
        console.log(error);
    }
});

// get a document by id
router.get('/get/:id', async(req,res)=>{
    try{
        const data = await items_model.findById(req.params.id);
        if(data){
            res.json({msg:"success", data});
        }
        else{
            res.json({err:"No such item found"});
        }
    }
    catch(error){
        res.json({error});
    }
})

// add a document
router.post('/post',async(req,res)=>{
    const{name, mobile, email} = req.body;
    try{
        console.log(req.body);
        const data = new items_model({
            name,
            mobile,
            email
        });
        const data2 = await data.save();

        if(data2){
            res.status(200).json({msg: "item saved successfully"});
            console.log("data inserted");
        }
        else{
            res.status(401).json({err:"error while saving item to model"});
            console.log("insertion failed");
        }
    }
    catch(error){
        console.log(error);
    }
});

// edit a document
router.put('/put/:id', async(req,res)=>{
    const{name, mobile, email} = req.body;
    try{
        const item = await items_model.findById(req.params.id);
        if(item){
            const data = await items_model.findByIdAndUpdate(req.params.id,{
                name, mobile, email
            });
            if(data){
                res.json({msg:"Item updated"});
            }
            else{
                res.json({msg:"Updation failed"});
            }
        }
    }
    catch(error){
        console.log(error);
    }
});

// delete a document
router.delete('/delete/:id', async(req,res)=>{
    try{
        const item = await items_model.findById(req.params.id);
        if(item){
            const data = await items_model.findByIdAndDelete(req.params.id);
            if(data){
                res.json({msg: "item deleted"})
            }
            else{
                res.json({err:"deletion failed"})
            }
        }
        else{
            res.json({err:"item not present in list"})
        }
        
    }
    catch(error){
        console.log(error);
    }
});


app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/', router);
module.exports = router;