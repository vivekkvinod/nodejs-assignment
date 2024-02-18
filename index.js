import express from 'express';
const app = express();

// Function to get the day of the date
function getDayFromDate(dateString) {
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const parts = dateString.match(/(\d{2})(\d{2})(\d{4})/);
    const day = new Date(parts[3], parts[2] - 1, parts[1]).getDay();
    return dayOfWeek[day];
}



app.get('/', (req, res) => {
    res.redirect('/getDay');
});

// Route to handle GET requests
app.get('/getDay', (req, res) => {
    const { date } = req.query;
    
    // Check if date parameter is provided
    if (!date || !/^\d{8}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid date format. Please provide date in DDMMYYYY format.' });
    }
    
    const day = getDayFromDate(date);
    res.json({ day });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
