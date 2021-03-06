const express = require('express')
const app = express()
const rowdy = require('rowdy-logger')

const routesReports = rowdy.begin(app)

const path = require('path')
const replaceInFile = require('replace-in-file')


app.get('/', (req, res) => {
    const filepath = path.join(__dirname, 'index.html')
    res.sendFile(filepath)
  })

app.get('/main.js', async (req, res) => {
    const filepath = path.join(__dirname, 'main.js')
    if (process.env.NODE_ENV === 'production'){
    await replaceInFile({
      files: filepath,
      from: 'http://localhost:3001/',
      to: 'https://welp-group-project-front.herokuapp.com//'
    })
   }
    res.sendFile(filepath)
  })


app.get('/style.css', (req, res) => {
    const filepath = path.join(__dirname, 'style.css')
    res.type('css').sendFile(filepath)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    routesReports.print()
})
