const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const multer = require('multer');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
//for router
const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');



//middleware 
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt()); //TODO
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));//TODO problme to see image on 
app.use(errorHandler);

//Routers
app.use(api + '/categories', categoriesRouter);
app.use(api + '/products', productsRouter);
app.use(api + '/users', usersRouter);
app.use(api + '/orders', ordersRouter);


mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('Database Connection is ready ...');
    })
    .catch((err) => {
        console.log(err);
    })

//listen to port 3000
app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
})


