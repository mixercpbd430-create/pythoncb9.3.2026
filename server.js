require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// =====================
// USER ACCOUNTS
// =====================
const USERS = {
    admin: {
        username: 'Admin',
        password: '2810',
        role: 'admin',
        displayName: 'Admin'
    },
    user: {
        username: 'User',
        password: '1430',
        role: 'user',
        displayName: 'User'
    }
};

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'giaotrinh-python-secret-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Serve static files (login.html must be accessible without auth)
app.use(express.static(path.join(__dirname)));

// =====================
// AUTH ROUTES (no auth required)
// =====================

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: 'Vui lòng nhập tên đăng nhập và mật khẩu' });
    }

    // Find user (case-insensitive username match)
    const user = Object.values(USERS).find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!user) {
        return res.status(401).json({ success: false, error: 'Sai tên đăng nhập hoặc mật khẩu' });
    }

    // Save to session
    req.session.user = {
        username: user.username,
        role: user.role,
        displayName: user.displayName
    };

    res.json({
        success: true,
        user: {
            username: user.username,
            role: user.role,
            displayName: user.displayName
        }
    });
});

// GET /api/auth/me - Check current login status
app.get('/api/auth/me', (req, res) => {
    if (req.session && req.session.user) {
        return res.json({
            loggedIn: true,
            user: req.session.user
        });
    }
    return res.status(401).json({ loggedIn: false });
});

// POST /api/auth/logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi khi đăng xuất' });
        }
        res.json({ success: true, message: 'Đã đăng xuất' });
    });
});

// =====================
// AUTH MIDDLEWARE
// =====================

// Require login for API routes
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    return res.status(401).json({ error: 'Chưa đăng nhập. Vui lòng đăng nhập trước.' });
}

// Require admin role for write operations
function requireAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Bạn không có quyền thực hiện thao tác này. Chỉ Admin mới có quyền chỉnh sửa.' });
}

// =====================
// PostgreSQL connection
// =====================
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
// API ROUTES (protected)
// =====================

// GET all notes for a chapter (requires login - any role can read)
app.get('/api/notes/:chapterId', requireAuth, async (req, res) => {
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

// POST a new note (requires Admin)
app.post('/api/notes/:chapterId', requireAuth, requireAdmin, async (req, res) => {
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

// PUT update a note (requires Admin)
app.put('/api/notes/:noteId', requireAuth, requireAdmin, async (req, res) => {
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

// DELETE a single note (requires Admin)
app.delete('/api/notes/:noteId', requireAuth, requireAdmin, async (req, res) => {
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

// DELETE all notes for a chapter (requires Admin)
app.delete('/api/notes/chapter/:chapterId', requireAuth, requireAdmin, async (req, res) => {
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

// Health check (required by Render)
app.get('/healthz', (req, res) => {
    res.status(200).json({ status: 'ok' });
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
