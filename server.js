const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/convert", (req, res) => {
    const { code_verifier } = req.query;

    if (!code_verifier) {
        return res.status(400).json({ error: "Missing code_verifier" });
    }

    try {
        // Băm SHA-256
        const hash = crypto.createHash("sha256").update(code_verifier).digest("base64");

        // Chuyển thành mã ASCII
        const asciiArray = Array.from(hash).map(char => char.charCodeAt(0)).join(" ");

        res.json([{ code_cha: asciiArray }]);
    } catch (error) {
        res.status(500).json({ error: "Conversion failed", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
