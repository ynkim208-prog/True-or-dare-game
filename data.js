// Vercel Serverless Function Backend for Say Hay Thách
let memoryDB = {
    questions: {
        easy: { truth: ["Kể tật xấu kỳ cục nhất."], dare: ["Gửi tin nhắn 'Nhớ quá' cho ngẫu nhiên."] },
        medium: { truth: ["Ai crush người trong bàn?"], dare: ["Uống 1 ly mix."] },
        hard: { truth: ["Bí mật chưa kể?"], dare: ["Cho xem lịch sử tìm kiếm."] }
    },
    penalties: [
        "🍻 Uống phạt 1 ly 100%!",
        "🥃 Phạt cạn ly đáy cốc!",
        "🔥 Uống 2 ly liên tiếp!"
    ]
};

export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json(memoryDB);
    }
    if (req.method === 'POST') {
        const { type, level, content } = req.body;
        if (type === 'question' && level && content) {
            if (!memoryDB.questions[level]) memoryDB.questions[level] = { truth: [], dare: [] };
            memoryDB.questions[level].truth.push(content);
            return res.status(200).json({ success: true, message: "Đã thêm câu hỏi thành công vào Backend", data: memoryDB });
        }
        return res.status(400).json({ success: false, message: "Invalid payload" });
    }
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
