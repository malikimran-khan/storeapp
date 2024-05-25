const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')
const apiRoutes = require('./routes/api')
const mobailroute = require('./routes/mobail')
const iphoneroute = require('./routes/iphone')
const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname , "public")));
mongoose.connect("mongodb://localhost:27017/storeapp" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("MongoDB connected successfully");
    app.use('/api' , apiRoutes)
    app.use('/api' , mobailroute)
    app.use('/api' , iphoneroute)
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
}).catch((error)=>{
console.log("Failed to connect mongodb" , error)
}).finally(()=>{
    console.log("Server setup complete")
})
