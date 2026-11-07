
import express from "express";
import urlRoute from "./routes/url.js";
import connectToMongoDB from "./routes/connect.js";
import URL from "./models/url.js";
const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("MongoDB connected"));

app.use("/url", urlRoute);

app.get('/:shortId', async (req, res) =>{
    const shortId = req.params.shortId;
 const entry = await URL.findOneAndUpdate({
    shortId
}, {
    $push:{
    visitHistory:{
    timestamp: Date.now(),
    },
},
}
);
res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log(`Server started at PORT:${PORT}`);
});
