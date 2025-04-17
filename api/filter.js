const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('fileInput'), (req, res) => {
    const { startDate, endDate } = req.body;
    const filePath = req.file.path;
    const chatExport = fs.readFileSync(filePath, 'utf-8');

    const lines = chatExport.split("\n");
    const filteredMessages = lines.filter(line => {
        const match = line.match(/\[([^\]]+)\]/);
        if (match) {
            const dateStr = match[1];
            const messageDate = new Date(dateStr);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return messageDate >= start && messageDate <= end;
        }
        return false;
    });

    const outputFilePath = path.join(__dirname, 'filtered_chat.txt');
    fs.writeFileSync(outputFilePath, filteredMessages.join("\n"));

    res.download(outputFilePath, 'filtered_chat.txt', (err) => {
        if (err) {
            console.error(err);
        }
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputFilePath);
    });
});

module.exports = app;