const express = require('express')
const app = express()
const port = 8000
const path = require('path')

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/app/:type/:file', (req,res) => {
	res.sendFile(path.join(__dirname, 'public'+req.url))
})

app.listen(port, ()=>{
	console.log(`port ${port} is open`)
})