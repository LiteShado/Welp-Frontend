const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')

const routesReports = rowdy.begin(app)

const path = require('path')
// const replaceInFile = require('replace-in-file')


app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'index.html')
    res.sendFile(filepath)
  })

app.get('/main.js', (req, res) => {
    const filepath = path.join(__dirname, 'main.js')
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
