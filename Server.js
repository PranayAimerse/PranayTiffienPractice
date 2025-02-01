const express=require("express")

const path = require('path');
const {router}=require("./routes/routes")
// const generalRoutes=require("./routes/generalRoutes")
const cookieparser=require("cookie-parser")

const fileupload=require("express-fileupload")

const app=express()
app.use(fileupload())
app.use(express.json())
app.use(cookieparser())
app.use("/api/v1",router)
app.use('/assets/', express.static(path.join(__dirname, '/assets/')));



const PORT=9000
app.listen(PORT,()=>{
  console.log(`app is running on port ${PORT}`)
})
