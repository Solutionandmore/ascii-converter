const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function textToAscii(text) {
    return text.split("").map(char => char.charCodeAt(0)).join(" ");
}

app.post("/convert", (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "No text provided" });
    }

    const ascii = textToAscii(text);
    res.json({ ascii });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
