
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
import express from 'express';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';
import viewsRouter from './routers/views.router.js';
import usersRouter from './routers/users.router.js';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import './db/dbConfig.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//session
const URI = 'mongodb+srv://morgadonazareno:vjUsUjQwwh4R2lSj@entregables.6ebvcie.mongodb.net/entregables?retryWrites=true&w=majority&appName=AtlasApp';
app.use(session({
    secret: "SECRETSESSIONKEY",
    cookie: {
        signed: true,
    },
    store: new mongoStore({
        mongoUrl: URI,
})
}));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando puerto ${PORT}...`);
});

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
})