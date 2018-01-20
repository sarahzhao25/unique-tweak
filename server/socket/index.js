module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      socket.broadcast.emit('deleteSocket', socket.id);
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('arrived', (id) => {
      socket.broadcast.emit('newSocket', id)
    })
  })
}
