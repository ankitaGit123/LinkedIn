const mongoose =require('mongoose');

// LinkedinClone

// mongoose.connect("mongodb://localhost:27017/LinkedinClone").then(res=>{
//     console.log("Database Successfully Connected")
// }).catch(err=>{
//     console.log("Database Connection Failed")
// })

mongoose.connect("mongodb+srv://ankitacodes25_db_user:5ofEcEBST6SwoZz5@linkedin.uohop0q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(res=>{
    console.log("Database Successfully Connected")
}).catch(err=>{
    console.log("Database Connection Failed")
})