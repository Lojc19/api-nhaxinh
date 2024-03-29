const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const dotenv = require("dotenv").config()
const port = process.env.PORT || 4000

const db = require('./src/config/db/connect');

const userRouter = require('./src/app/routes/user.route')
const productRouter = require('./src/app/routes/product.route');
const roomRouter = require('./src/app/routes/room.route');
const cateRouter = require('./src/app/routes/category.route');
const cartRouter = require('./src/app/routes/cart.route');
const addressRouter = require('./src/app/routes/address.route');
const couponRouter = require('./src/app/routes/coupon.route');
const orderRouter = require('./src/app/routes/order.route');
const reviewRouter = require('./src/app/routes/review.route');
const statisticalRouter = require('./src/app/routes/statistical.route')

const { errorHandler, notFound } = require('./src/app/middlewares/errorHandler');


db.connect();

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// app.use(cors({
//   origin: ['http://localhost:5500'],
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));

  // app.use(cors());

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/room", roomRouter);
app.use("/api/category", cateRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);
app.use("/api/statistical", statisticalRouter)

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at Port: ${port}`)
})