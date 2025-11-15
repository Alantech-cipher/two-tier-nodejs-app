// Importing required packages 

const express = require('express');
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Middleware setup

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('views'));

// Connect to MongoDB

mongose.connect('mongodb://mongo:27017/messagesDB',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the data structure (Schema + Model)

const messageSchema = new mongose.Schema({
    text: String,

});

const Message = mongose.model('Message', messageSchema);

// Handle GET request (/)

app.get('/', async (req, res) => {
    const messages = await Message.find();
    let list = messages.map(m => `<li>${m.text}</li>`).join('');
    res.send(`
        <h1>📩 Message Board</h1>
        <form method="POST" action="/add">
            <input name="text" placeholder="Enter message" />
            <button type="submit">Submit</button>
            </form>
            <ul>${list}</ul>
    `);
});

// Handle POST request (add)

app.post('/add', async (req, res) => {
    const msg = new Message({ text: req.body.text });
    await msg.save();
    res.redirect('/');
});

// start the server 

app.listen(3000, () => console.log('Node app is running on port 3000'));
