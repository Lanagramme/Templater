const express = require('express')
const app = express()
const port = 8000
const path = require('path')

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/css', (req,res) => {
	res.sendFile(path.join(__dirname, './public/app/scss/styles.css'))
})

app.get('/js', (req,res) => {
	res.sendFile(path.join(__dirname, './public/app/JS/index.js'))
})

app.get('/jquery', (req,res) => {
	res.sendFile(path.join(__dirname, './public/app/JS/jquery-3.6.0.js'))
})

app.listen(port, ()=>{
	console.log(`port ${port} is open`)
})