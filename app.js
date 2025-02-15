const express = require('express');
const app = express();
const path = require("path");
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  
    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        io.emit("user-disconnect", socket.id);
    });
});

app.get('/', function (req, res) {
    res.render("map.ejs");
});

server.listen(3000, () => {
    console.log("Server is running on 3000");
});
