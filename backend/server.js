import express from 'express';
import dotenv from 'dotenv';
import db from './connectdb/db.js';
import { Server } from 'socket.io';
import http from 'http';
import Document from './document/document.js'

dotenv.config()
const app =express()

app.use(express.json())



const server =http.createServer(app)

const io = new Server(server, {
  cors:{
    origin:['http://localhost:5173'],
    methods:['GET','POST']
  }
})

const defaultValue = " "

io.on('connection',(socket)=>{
  socket.on('get-document', async documentId =>{
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit('load-document', document.data)

    socket.on('send-changes', (delta)=>{
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on('save-document' ,async data =>{
      await Document.findByIdAndUpdate(documentId, {data})
    })
  })
})


async function findOrCreateDocument(id){
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({_id:id, data:defaultValue})
}



const port = process.env.PORT || 5555
server.listen(port, ()=>{
  console.log(`server running on server: ${port}`)
  db()
})

