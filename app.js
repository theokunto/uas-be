const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoute');
const mahasiswaRoutes = require('./routes/mahasiswaRoute');
const krsRoutes = require('./routes/krsRoute');

dotenv.config();

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/mahasiswa', mahasiswaRoutes);
app.use('/krs', krsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
