const express = require("express");
const app = express();
app.use(express.json()); // Cần để đọc JSON body

app.post("/convert", (req, res) => {
    const { code_verifier } = req.body;
    if (!code_verifier) {
        return res.status(400).json({ error: "Missing code_verifier" });
    }

    // Chuyển đổi code_verifier thành mã ASCII
    const asciiValues = code_verifier.split("").map(char => char.charCodeAt(0)).join(" ");

    res.json({ code_cha: asciiValues });
});

// Chạy server trên Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
