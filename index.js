const express = require('express');
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const { connectToMongoDB } = require('./connect');

const app = express(); // 1. Initialize app first!
const PORT = 3000;

// 2. Parsers/Middleware next
app.use(express.json()); 

// 3. Application Routes
app.use('/url', urlRoute);

// 4. Database Connection
connectToMongoDB('mongodb://127.0.0.1:27017/url-shortner')
    .then(() => console.log('MongoDB connected'));



app.get('/:shortId', async (req,res) =>{
    const shortId = req.params.shortId;
  const entry=  await URL.findOneAndUpdate({
        shortId
    } , {
      $push:{
        visitHistory:{
            timestamp:Date.now(),
        },
      } , 
    },
);
res.redirect(entry.redirectURL);
});









// 5. Start Server Listener
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));