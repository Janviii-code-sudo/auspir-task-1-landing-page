const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'waitlist.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const readRecords = () => {
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]');
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
};

app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
  }

  const records = readRecords();
  if (records.some(r => r.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ success: false, message: 'You are already registered!' });
  }

  const newRecord = {
    id: records.length + 1,
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString()
  };

  records.push(newRecord);
  fs.writeFileSync(DB_PATH, JSON.stringify(records, null, 2));

  res.status(201).json({
    success: true,
    message: `✓ Invite reserved for ${newRecord.email}!`,
    data: newRecord
  });
});

app.get('/api/waitlist', (req, res) => {
  res.json({ count: readRecords().length, data: readRecords() });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));