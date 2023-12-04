const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io")
const { createServer } = require("http");


const app = express();
const socketServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// ROUTE IMPORTS
// const product = require("./routes/productRoute");

const product = require("./routes/productRoutes");



app.use("/api/v1", product);


// MIDDLEWARE FOR ERROR
app.use(errorMiddleware);

//









// Socket Connection && CODE
const io = new Server(socketServer, {
    cors: {
        origin: "https://inventory-9bz1ec4wp-hamzatariqs-projects.vercel.app/",
        methods: ["*"],
    },
});




let products = [];



io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("addProduct", product => {
     
        products.push(product);
        io.emit("getProducts", products)
    })
    socket.on("updateProduct", product => {
     
        products.push(product)
        io.emit("getProducts", products)
    })
    socket.on("deleteNotification", product => {
     console.log(product.id);

     console.log(products);

     products.filter((item)=>item.id===product.id)

     console.log("FilterArray",products);


        io.emit("getProducts", products)
    })


})



socketServer.listen(8080, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Socket Server is running on port: 8080...");
    }
})

module.exports = app;
