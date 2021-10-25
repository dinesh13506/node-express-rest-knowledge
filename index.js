const express = require("express") 
const app = express() //create an express app
const port = 3000 //port on which express server will listen
app.get('/', (req, res) => {
res.send('Hello World!')
})
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})
