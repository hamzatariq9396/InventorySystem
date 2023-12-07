const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Server } = require("socket.io")
const { createServer } = require("http");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const app = express();
const socketServer = createServer(app);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use(cors({
//     origin:'https://inventory-system-frontend-5bk88eog0-hamzatariqs-projects.vercel.app/',
//     optionsSuccessStatus: 200,
// }));


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
        origin: process.env.FRONTEND_URL,
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
        console.log(product.id, product.actionType);

        console.log("Original Array", products);

        // Create a new array with items that do not match the filter condition
        const filteredProducts = products.filter((item) => item.id !== product.id || item.actionType !== product.actionType);

        console.log("FilterArray", filteredProducts);

        // Update the original array with the filtered array
        products = filteredProducts;

        io.emit("getProducts", products);
    });


})


const socketPort = process.env.SOCKET_PORT


socketServer.listen(socketPort, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Socket Server is running on port:${socketPort}`);
    }
})

module.exports = app;
