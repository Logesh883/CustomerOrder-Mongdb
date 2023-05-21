const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const exhbs = require('express-handlebars');
const dbo = require('./server');
const ObjectID = dbo.ObjectID;
const path = require('path');

app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'views')));

app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('custorder');
    const cursor = collection.find({})
    let custorder = await cursor.toArray();

    let message = '';
    let edit_id, edit_book;

    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_book = await collection.findOne({_id:new ObjectID(edit_id)})
    }

    if (req.query.delete_id) {
        await collection.deleteOne({_id:new ObjectID(req.query.delete_id)})
        return res.redirect('/?status=3');
    }
    
    switch (req.query.status) {
        case '1':
            message = 'Inserted Succesfully!';
            break;

        case '2':
            message = 'Updated Succesfully!';
            break;

        case '3':
            message = 'Deleted Succesfully!';
            break;
    
        default:
            break;
    }


    res.render('main',{message,custorder,edit_id,edit_book})
})

app.post('/store_database',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('custorder');
    let cust = { customerid: req.body.customerid, orderid: req.body.orderid,amount:req.body.amount,address:req.body.address  };
    await collection.insertOne(cust);
    return res.redirect('/?status=1');
})

app.post('/update_database/:edit_id',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('custorder');
    let cust = { customerid: req.body.customerid, orderid: req.body.orderid,amount:req.body.amount,address:req.body.address  };
    let edit_id = req.params.edit_id;
    await collection.updateOne({_id:new ObjectID(edit_id)},{$set:cust});
    return res.redirect('/?status=2');
})





app.listen(8000,()=>{console.log('Server connected to port 8000');})
