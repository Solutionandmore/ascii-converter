const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

app.post("/convert", (req, res) => {
    const { code_verifier } = req.body;

    if (!code_verifier) {
        return res.status(400).json({ error: "Missing code_verifier" });
    }

    // Bước 1: Chuyển `code_verifier` thành ASCII
    const asciiValues = Array.from(code_verifier).map(char => char.charCodeAt(0)).join(" ");

    // Bước 2: Băm chuỗi ASCII bằng SHA-256
    const hash = crypto.createHash("sha256").update(code_verifier).digest();

    // Bước 3: Chuyển sang Base64 URL-safe
    const base64 = hash.toString("base64")
        .replace(/\+/g, "-") // Thay '+' thành '-'
        .replace(/\//g, "_") // Thay '/' thành '_'
        .replace(/=+$/, ""); // Loại bỏ '=' ở cuối

    res.json({
        code_challenge: base64
    });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
