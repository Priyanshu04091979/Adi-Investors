const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const DB_DIR = path.join(__dirname, '..', 'database');
const EXCEL_FILE = path.join(DB_DIR, 'contact_submissions.xlsx');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

app.post('/api/contact', (req, res) => {
  const { fullName, email, phone, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Define new row data
  const newRow = {
    Date: new Date().toLocaleString(),
    'Full Name': fullName,
    Email: email,
    'Phone Number': phone || '',
    Subject: subject,
    Message: message
  };

  let workbook;
  let worksheet;

  // Check if file exists to either append or create new
  if (fs.existsSync(EXCEL_FILE)) {
    workbook = xlsx.readFile(EXCEL_FILE);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);
    data.push(newRow);
    const newWorksheet = xlsx.utils.json_to_sheet(data);
    workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
  } else {
    workbook = xlsx.utils.book_new();
    worksheet = xlsx.utils.json_to_sheet([newRow]);
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Submissions');
  }

  // Write to file
  try {
    xlsx.writeFile(workbook, EXCEL_FILE);
    res.status(200).json({ success: true, message: 'Message recorded successfully' });
  } catch (error) {
    console.error('Error writing to Excel:', error);
    res.status(500).json({ error: 'Failed to record message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
