const express = require("express");
const app = express();
const port = 5500;
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;
const usersRouter = require('./model/user');
const Product = require('./model/Product');

// cors code 
var cors = require('cors')
app.use(cors())
var whitelist = ['http://localhost:5173']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
// jwt code 
const jwt = require('jsonwebtoken');
const secretKey = 'hybyhyby';

// cloudinary configuration 
cloudinary.config({ 
    cloud_name: 'delde3vvw', 
    api_key: '677662562595255', 
    api_secret: 'OtKmdP9jhhYIXObdsuUmVbDCuV4'
  });


// mongo connection..........................
const connect = async () => {
    try {
        const database = await mongoose.connect('mongodb+srv://sastaolx123:Vg9mi8oQk3rwIkIC@mycluster.ska5aw9.mongodb.net/foodapp')
        console.log("mongo conneted!");
    } catch (error) {
        console.log("error mongo" + error);
    }
}
connect();

// getdata from mongo 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000);
    next();
});

// multer setup 
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/Images")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({ storage })

// static files serve 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload({
    useTempFiles: true
}))
app.use('/card/image', express.static('public/images'));

 // get request ..........................
app.get('/', function (req, res) {
    res.send("1");
})
app.get('/home', function (req, res) {
    res.send("1");
})
app.get('/product', function (req, res) {
    res.send("1");
})
app.get('/createaccount', function (req, res) {
    res.send("1");

})
app.get('/login', function (req, res) {
    res.send("1");
})
app.get('/productdata', async (req, res) => {
    Product.find().then(productdata => res.json(productdata))
        .catch(err => console.log(err))
})

// post Request ..........................
app.post('/createaccount', async (req, res) => {
    var userdata = new usersRouter({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    const savedUser = await userdata.save();
    let user = await usersRouter.findOne(req.body).select("-password");
    if (req.body.username && req.body.password) {
        if (user) {
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
            res.send("1 " + token);
        }
        else {
            res.send("0");
        }
    }
    else {
        res.send("0");

    }
});
app.post('/login', async (req, res) => {
    let user = await usersRouter.findOne(req.body).select("-password");
    if (req.body.username && req.body.password) {
        if (user) {
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
            res.send("1 " + token);
        }
        else {
            res.send("0");
        }
    }
    else {
        res.send("0");

    }
})
app.post('/api/checkauth', async (req, res) => {
    const tokenfromclient = req.body.Authorization;
    if (tokenfromclient) {
        var tokenfromclient1 = tokenfromclient.replace(/"/g, '');
    }
    if (tokenfromclient1) {
        jwt.verify(tokenfromclient1, secretKey, (err, valid) => {
            if (err) {
                res.send("0");
            }
            else {
                res.send("1");
            }
        })
    } else {
        res.send("0");
    }

})

// multer code uplode 
// upload.fields([
//     { name: 'file', maxCount: 1 },
//     { name: 'subimg1', maxCount: 1 },
//     { name: 'subimg2', maxCount: 1 },
//     { name: 'subimg3', maxCount: 1 },
//     { name: 'subimg4', maxCount: 1 }
// ]), 
app.post('/products',async (req, res) => {
    try {
        // const file0 = req.files.file;
        var imageFilename;
    //    await cloudinary.uploader.upload(file0.tempFilePath, (err,result)=>{
            
    //          imageFilename = result.url;
             imageFilename = req.files.file;
    //     })
    //     const file1 = req.files.subimg1;
    //     var subimg1;
    //     await cloudinary.uploader.upload(file1.tempFilePath, (err,result)=>{
           
    //          subimg1 = result.url;
             subimg1 = "ok";
    //     })
    //     const file2 = req.files.subimg2;
    //     var subimg2;
    //     await cloudinary.uploader.upload(file2.tempFilePath, (err,result)=>{
        
    //          subimg2 = result.url;
             subimg2 = "ok";
    //     })
    //     const file3 = req.files.subimg3;
    //     var subimg3;
    //     await cloudinary.uploader.upload(file3.tempFilePath, (err,result)=>{
       
    //          subimg3 = result.url;
             subimg3 = "ok";
    //     })
        // const file4 = req.files.subimg4;
    //     var subimg4;
    //     await cloudinary.uploader.upload(file4.tempFilePath, (err,result)=>{
          
            //  subimg4 = result.url;
             subimg4 = "ok";
    //     })
        const productname = req.body.productname;
        const title = req.body.title;
        const type = req.body.type;
        const size = req.body.size;
        const location = req.body.location;
        const brand = req.body.brand;
        const description = req.body.desc;
        const price = req.body.price;
        const newProduct = new Product({
            imageFilename,
            subimg1,
            subimg2,
            subimg3,
            subimg4,
            productname,
            title,
            type,
            size,
            location,
            brand,
            description,
            price,
        });
        //   await newProduct.save();

        // res.status(201).json(1);
        res.status(201).send(imageFilename);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
       
    }
});



// listening port..........................
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
