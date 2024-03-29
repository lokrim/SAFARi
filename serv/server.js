const express = require('express');
const bodyParser = require('body-parser');
const supabase=require('./supabase')

const app = express();
const port = 3000;
const cors=require('cors')
// Parse JSON bodies
const corsOptions={origin:"*"}
app.use(bodyParser.json());
app.use(cors(corsOptions))
// Handle POST request to /send-json
app.get('/send-json', async (req, res) => {
   try {
    const {data,error} =await supabase.from('hft').select();
    if(error){
        throw error;
    }
    res.json(data);
    
   } catch (error) {
    res.status(500).send('error')
    
   }
});

app.get('/get-latest', async (req, res) => {
    try {
     const {data,error} =await supabase.from('hft').select();
     if(error){
         throw error;
     }
     res.json(data);
     
    } catch (error) {
     res.status(500).send('error')
     
    }
 });


app.post('/send-coords', async (req, res) => {
    try {
        const { xcord, ycord } = req.body;
        const { data, error } = await supabase.from('hft').insert([{ xcord, ycord }]);
        if (error) {
            throw error;
        }
        res.json(data);
    } catch (error) {
        console.error('Error inserting data:', error.message);
        res.status(500).send('Error inserting data');
    }
});



// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});