const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')

const routesReports = rowdy.begin(app)

const path = require('path')
// const replaceInFile = require('replace-in-file')


app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'index.html')
    resizeBy.sendFile(filepath)
})

app.get('/main.js', async (req, res) => {
    const filepath = path.join(__dirname, 'main.js')
    resizeBy.sendFile(filepath)

if (process.env.NODE_ENV === 'production') {
     await replaceInFile({
        files: filepath,
        from: 'http://localhost:3001',
        to: 'https://lyrically-backend.herokuapp.com'
    })
  }
    res.sendFile(filepath)
})


app.get('/style.css', (req, res) => {
    const filepath = path.join(__dirname, 'style.css')
    resizeBy.sendFile(filepath)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    routesReports.print()
})
