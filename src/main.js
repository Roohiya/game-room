import Koa from 'koa'
import http from 'http'
import socketIo from 'socket.io'
import router from './router'
import shortId from 'shortid'

const app = new Koa()
app
.use(router.routes())
.use(router.allowedMethods())

const server = http.createServer(app)
const io = socketIo(server, {
  origins: '*:*',
  pingTimeout: 60000
})

let games = {}

io.on('connection', socket => {
  console.log('New channel connected!')

  socket.on('createGame', (data) => {
    const { playerOneName } = data

    const roomId = shortId.generate()
    socket.join(roomId)

    games[roomId] = {
      playerOne: playerOneName,
      room: roomId
    }

    socket.emit('newGame', games[roomId])
  })

  socket.on('joinGame', (data) => {
    const { playerTwoName, roomId } = data

    const roomNum = io.nsps['/'].adapter.rooms[roomId]

    if (roomNum && roomNum.length === 1) {
      socket.join(roomId)

      games[roomId].playerTwo = playerTwoName
      games[roomId].startGame = true

      io.sockets.in(roomId).emit('connectToRoom', games[roomId])
    } else {
      socket.emit('connectToRoom', {startGame: false})
    }
  })
})

server.listen(4242, () => {
  console.log('Application is starting on port 4242')
})
