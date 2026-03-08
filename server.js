require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// PostgreSQL connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// Initialize database table
async function initDB() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS notes (
                id SERIAL PRIMARY KEY,
                chapter_id INT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `);
        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_notes_chapter ON notes(chapter_id)
        `);
        console.log('✅ Database initialized');
    } catch (err) {
        console.error('❌ Database init error:', err.message);
    }
}

// =====================
// API ROUTES
// =====================

// GET all notes for a chapter
app.get('/api/notes/:chapterId', async (req, res) => {
    try {
        const { chapterId } = req.params;
        const result = await pool.query(
            'SELECT id, chapter_id, content, created_at FROM notes WHERE chapter_id = $1 ORDER BY created_at DESC',
            [chapterId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching notes:', err.message);
        res.status(500).json({ error: 'Lỗi khi tải ghi chú' });
    }
});

// POST a new note
app.post('/api/notes/:chapterId', async (req, res) => {
    try {
        const { chapterId } = req.params;
        const { content } = req.body;
        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Nội dung không được trống' });
        }
        const result = await pool.query(
            'INSERT INTO notes (chapter_id, content) VALUES ($1, $2) RETURNING id, chapter_id, content, created_at',
            [chapterId, content.trim()]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating note:', err.message);
        res.status(500).json({ error: 'Lỗi khi lưu ghi chú' });
    }
});

// PUT update a note
app.put('/api/notes/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;
        const { content } = req.body;
        if (!content || !content.trim()) {
            return res.status(400).json({ error: 'Nội dung không được trống' });
        }
        const result = await pool.query(
            'UPDATE notes SET content = $1 WHERE id = $2 RETURNING id, chapter_id, content, created_at',
            [content.trim(), noteId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating note:', err.message);
        res.status(500).json({ error: 'Lỗi khi cập nhật ghi chú' });
    }
});

// DELETE a single note
app.delete('/api/notes/:noteId', async (req, res) => {
    try {
        const { noteId } = req.params;
        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 RETURNING id',
            [noteId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy ghi chú' });
        }
        res.json({ message: 'Đã xóa ghi chú' });
    } catch (err) {
        console.error('Error deleting note:', err.message);
        res.status(500).json({ error: 'Lỗi khi xóa ghi chú' });
    }
});

// DELETE all notes for a chapter
app.delete('/api/notes/chapter/:chapterId', async (req, res) => {
    try {
        const { chapterId } = req.params;
        const result = await pool.query(
            'DELETE FROM notes WHERE chapter_id = $1',
            [chapterId]
        );
        res.json({ message: `Đã xóa ${result.rowCount} ghi chú`, count: result.rowCount });
    } catch (err) {
        console.error('Error clearing notes:', err.message);
        res.status(500).json({ error: 'Lỗi khi xóa ghi chú' });
    }
});

// Catch-all: serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
});
