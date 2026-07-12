const {nanoid} = require('nanoid');


const URL = require('../models/url'); 


async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:"url is required"})
 const shortID = nanoid(8);
 await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
 });
 return res.json({id: shortID});
}


async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    
    // 1. Fetch from database
    const result = await URL.findOne({ shortId });
    
    // 2. SAFETY CHECK: If the ID wasn't found, stop here!
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    
    // 3. If it exists, now it's safe to read visitHistory
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}


module.exports={handleGenerateNewShortURL , handleGetAnalytics};