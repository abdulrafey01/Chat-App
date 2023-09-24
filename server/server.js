const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const cors = require('cors')

const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

const app = express()

// app.use(cors())

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
})

io.on('connection', (socket) => {

    socket.on('join', ({ name, room }, callback) => {
        console.log(name, room)
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` })

        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, text: message })

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        console.log(`User ${user.name} has left.`)
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
        }

    })
})

app.use(router)


server.listen(4000, () => {
    console.log('Server Is Listening on 4000')
})