const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 5000

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    },
});

app.use(cors())

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "client", "build", "index.html"))
})

io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);

    socket.on("send-message", ({ recipients, text }) => {
        recipients.forEach((recipient) => {
            const newRecipients = recipients.filter((r) => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit("receive-message", {
                recipients: newRecipients,
                sender: id,
                text,
            });
        });
    });
});

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})
