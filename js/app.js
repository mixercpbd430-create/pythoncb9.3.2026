/* ===================================
   APP.JS - Main Application Logic
   =================================== */

// All chapters are loaded via script tags and stored in window.chaptersData
(function () {
    'use strict';

    // Collect all chapter data (direct references since const doesn't attach to window)
    function getAllChapters() {
        return [
            chapter1, chapter2, chapter3, chapter4, chapter5,
            chapter6, chapter7, chapter8, chapter9, chapter10,
            chapter11, chapter12, chapter13, chapter14, chapter15,
            chapter16, chapter17, chapter18, chapter19, chapter20,
            chapter20b, chapter21, chapter22
        ].filter(Boolean).sort((a, b) => (a.sortOrder || a.id) - (b.sortOrder || b.id));
    }

    // Helper: display label for chapter number (handles special IDs like 23 -> '20b')
    function getChapterLabel(ch) {
        if (ch.displayLabel) return ch.displayLabel;
        return String(ch.id).padStart(2, '0');
    }

    // Detect which page we are on
    const isHomePage = document.getElementById('chaptersGrid') !== null;
    const isChapterPage = document.getElementById('chapterContent') !== null;

    // =====================
    // HOME PAGE
    // =====================
    if (isHomePage) {
        const grid = document.getElementById('chaptersGrid');
        const chapters = getAllChapters();

        chapters.forEach(ch => {
            const card = document.createElement('a');
            card.href = `chapter.html?ch=${ch.id}`;
            card.className = 'chapter-card';
            card.innerHTML = `
                <div class="chapter-card__number">${getChapterLabel(ch)}</div>
                <h3 class="chapter-card__title">${ch.title}</h3>
                <p class="chapter-card__desc">${ch.description}</p>
                <div class="chapter-card__arrow">Học ngay →</div>
            `;
            grid.appendChild(card);
        });
    }

    // =====================
    // CHAPTER PAGE
    // =====================
    if (isChapterPage) {
        const params = new URLSearchParams(window.location.search);
        const chapterNum = parseInt(params.get('ch')) || 1;
        const chapters = getAllChapters();
        const chapter = chapters.find(c => c.id === chapterNum);

        if (!chapter) {
            document.getElementById('chapterContent').innerHTML = `
                <div style="text-align:center; padding:80px 20px;">
                    <h1 style="font-size:3rem;margin-bottom:16px;">😕</h1>
                    <h2 style="color:var(--text-heading);margin-bottom:12px;">Không tìm thấy chương</h2>
                    <p style="color:var(--text-secondary);">Chương ${chapterNum} không tồn tại.</p>
                    <a href="index.html" style="display:inline-block;margin-top:24px;padding:10px 24px;background:var(--accent-gradient);color:white;border-radius:var(--radius-md);font-weight:600;">← Về trang chủ</a>
                </div>`;
            return;
        }

        // Update page title
        document.title = `Chương ${getChapterLabel(chapter)}: ${chapter.title} — Giáo Trình Python`;

        // Render sidebar
        renderSidebar(chapters, chapterNum);

        // Render chapter header
        document.getElementById('chapterBadge').textContent = `Chương ${getChapterLabel(chapter)} / ${chapters.length}`;
        document.getElementById('chapterTitle').textContent = chapter.title;
        document.getElementById('chapterDesc').textContent = chapter.description;

        // Render theory
        document.getElementById('theoryContent').innerHTML = chapter.theory;

        // Render exercises
        renderExercises(chapter.exercises);

        // Render navigation
        renderNav(chapters, chapterNum);

        // Initialize code highlighting
        initHighlighting();

        // Setup code copy buttons
        setupCopyButtons();

        // Setup sidebar toggle
        setupSidebarToggle();

        // Setup exercise toggles
        setupExerciseToggles();

        // Render & setup notes
        renderNotes(chapterNum);
        setupNotes(chapterNum);
    }

    // =====================
    // RENDER FUNCTIONS
    // =====================

    function renderSidebar(chapters, activeId) {
        const list = document.getElementById('sidebarList');
        chapters.forEach(ch => {
            const li = document.createElement('li');
            li.className = 'sidebar__item';
            const isActive = ch.id === activeId;
            li.innerHTML = `
                <a href="chapter.html?ch=${ch.id}" 
                   class="sidebar__link ${isActive ? 'sidebar__link--active' : ''}">
                    <span class="sidebar__link-num">${getChapterLabel(ch)}</span>
                    <span>${ch.title}</span>
                </a>`;
            list.appendChild(li);
        });

        // Scroll active item into view
        setTimeout(() => {
            const activeLink = list.querySelector('.sidebar__link--active');
            if (activeLink) {
                activeLink.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
        }, 100);
    }

    function renderExercises(exercises) {
        const container = document.getElementById('exercisesContent');
        if (!exercises || exercises.length === 0) {
            container.innerHTML = '<p style="color:var(--text-muted);font-style:italic;">Chưa có bài tập. Sẽ được bổ sung sớm!</p>';
            return;
        }

        exercises.forEach((ex, index) => {
            const card = document.createElement('div');
            card.className = 'exercise-card exercise-card--open';

            let codeHTML = '';
            if (ex.code) {
                codeHTML = `
                    <div class="code-block">
                        <div class="code-block__header">
                            <span class="code-block__lang">Python</span>
                            <button class="code-block__copy" onclick="copyCode(this)">📋 Copy</button>
                        </div>
                        <pre><code class="language-python">${escapeHtml(ex.code)}</code></pre>
                    </div>`;
            }

            let explanationHTML = '';
            if (ex.explanation) {
                explanationHTML = `
                    <div class="exercise-card__explanation">
                        <strong>💡 Giải thích:</strong> ${ex.explanation}
                    </div>`;
            }

            card.innerHTML = `
                <div class="exercise-card__header">
                    <span class="exercise-card__num">${index + 1}</span>
                    <span class="exercise-card__title">${ex.title}</span>
                    <span class="exercise-card__toggle">▼</span>
                </div>
                <div class="exercise-card__body">
                    <div class="exercise-card__content">${ex.content}</div>
                    ${codeHTML}
                    ${explanationHTML}
                </div>`;
            container.appendChild(card);
        });
    }

    function renderNav(chapters, currentId) {
        const nav = document.getElementById('chapterNav');
        const currentIndex = chapters.findIndex(c => c.id === currentId);
        const prevCh = currentIndex > 0 ? chapters[currentIndex - 1] : null;
        const nextCh = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

        let html = '';

        if (prevCh) {
            html += `
                <a href="chapter.html?ch=${prevCh.id}" class="chapter-nav__btn chapter-nav__btn--prev">
                    <span class="chapter-nav__arrow">←</span>
                    <div>
                        <div class="chapter-nav__label">Chương trước</div>
                        <div class="chapter-nav__title">${prevCh.title}</div>
                    </div>
                </a>`;
        } else {
            html += `<div class="chapter-nav__btn chapter-nav__btn--prev chapter-nav__btn--disabled">
                <span class="chapter-nav__arrow">←</span>
                <div>
                    <div class="chapter-nav__label">Chương trước</div>
                    <div class="chapter-nav__title">Đây là chương đầu tiên</div>
                </div>
            </div>`;
        }

        if (nextCh) {
            html += `
                <a href="chapter.html?ch=${nextCh.id}" class="chapter-nav__btn chapter-nav__btn--next">
                    <div>
                        <div class="chapter-nav__label">Chương tiếp</div>
                        <div class="chapter-nav__title">${nextCh.title}</div>
                    </div>
                    <span class="chapter-nav__arrow">→</span>
                </a>`;
        } else {
            html += `<div class="chapter-nav__btn chapter-nav__btn--next chapter-nav__btn--disabled">
                <div>
                    <div class="chapter-nav__label">Chương tiếp</div>
                    <div class="chapter-nav__title">Đây là chương cuối cùng</div>
                </div>
                <span class="chapter-nav__arrow">→</span>
            </div>`;
        }

        nav.innerHTML = html;
    }

    // =====================
    // UTILITY FUNCTIONS
    // =====================

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function initHighlighting() {
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }
    }

    function setupCopyButtons() {
        // Also handle code blocks in the theory section
        const theoryCodeBlocks = document.querySelectorAll('.content-body pre code');
        theoryCodeBlocks.forEach(block => {
            const pre = block.parentElement;
            if (!pre.parentElement.classList.contains('code-block')) {
                // Wrap in code-block structure
                const wrapper = document.createElement('div');
                wrapper.className = 'code-block';
                wrapper.innerHTML = `
                    <div class="code-block__header">
                        <span class="code-block__lang">Python</span>
                        <button class="code-block__copy" onclick="copyCode(this)">📋 Copy</button>
                    </div>`;
                pre.parentElement.insertBefore(wrapper, pre);
                wrapper.appendChild(pre);
            }
        });
    }

    window.copyCode = function (btn) {
        const codeBlock = btn.closest('.code-block');
        const code = codeBlock.querySelector('code');
        const text = code.textContent;

        navigator.clipboard.writeText(text).then(() => {
            btn.classList.add('code-block__copy--copied');
            btn.textContent = '✅ Đã copy!';
            setTimeout(() => {
                btn.classList.remove('code-block__copy--copied');
                btn.textContent = '📋 Copy';
            }, 2000);
        }).catch(() => {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            btn.textContent = '✅ Đã copy!';
            setTimeout(() => { btn.textContent = '📋 Copy'; }, 2000);
        });
    };

    function setupSidebarToggle() {
        const toggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (toggle) {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('sidebar--open');
                overlay.classList.toggle('sidebar-overlay--active');
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('sidebar--open');
                overlay.classList.remove('sidebar-overlay--active');
            });
        }
    }

    function setupExerciseToggles() {
        document.querySelectorAll('.exercise-card__header').forEach(header => {
            header.addEventListener('click', () => {
                const card = header.parentElement;
                card.classList.toggle('exercise-card--open');
            });
        });
    }

    // =====================
    // NOTES FUNCTIONS
    // =====================

    function getNotesKey(chapterId) {
        return 'python_notes_ch_' + chapterId;
    }

    function getNotes(chapterId) {
        const raw = localStorage.getItem(getNotesKey(chapterId));
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
            // Migrate old single-string format
            if (typeof parsed === 'string' && parsed.trim()) {
                const migrated = [{ id: Date.now(), text: parsed, createdAt: new Date().toISOString() }];
                localStorage.setItem(getNotesKey(chapterId), JSON.stringify(migrated));
                return migrated;
            }
            return [];
        } catch {
            // Old format was plain string (not JSON)
            if (raw.trim()) {
                const migrated = [{ id: Date.now(), text: raw, createdAt: new Date().toISOString() }];
                localStorage.setItem(getNotesKey(chapterId), JSON.stringify(migrated));
                return migrated;
            }
            return [];
        }
    }

    function saveNotes(chapterId, notes) {
        localStorage.setItem(getNotesKey(chapterId), JSON.stringify(notes));
    }

    function formatNoteTime(isoString) {
        const d = new Date(isoString);
        const pad = n => String(n).padStart(2, '0');
        const day = pad(d.getDate());
        const month = pad(d.getMonth() + 1);
        const year = d.getFullYear();
        const hours = pad(d.getHours());
        const mins = pad(d.getMinutes());
        return `${day}/${month}/${year} lúc ${hours}:${mins}`;
    }

    function renderNotesList(chapterId) {
        const container = document.getElementById('notesList');
        if (!container) return;

        const notes = getNotes(chapterId);

        if (notes.length === 0) {
            container.innerHTML = '<div class="notes-list__empty">📋 Chưa có ghi chú nào. Hãy thêm ghi chú đầu tiên!</div>';
            return;
        }

        let html = `<div class="notes-list__header">
            <span class="notes-list__count">📌 ${notes.length} ghi chú</span>
        </div>`;

        // Show newest first
        const sorted = [...notes].reverse();
        sorted.forEach(note => {
            const escapedText = note.text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');

            html += `
            <div class="note-card" data-note-id="${note.id}">
                <div class="note-card__header">
                    <span class="note-card__time">
                        <span class="note-card__time-icon">🕐</span>
                        ${formatNoteTime(note.createdAt)}
                    </span>
                    <div class="note-card__actions">
                        <button class="note-card__action-btn note-card__action-btn--edit" 
                                onclick="editNote(${note.id})" title="Sửa">✏️</button>
                        <button class="note-card__action-btn note-card__action-btn--delete" 
                                onclick="deleteNote(${note.id})" title="Xóa">🗑️</button>
                    </div>
                </div>
                <div class="note-card__body">${escapedText}</div>
            </div>`;
        });

        container.innerHTML = html;
    }

    function renderNotes(chapterId) {
        renderNotesList(chapterId);
    }

    function setupNotes(chapterId) {
        const textarea = document.getElementById('notesTextarea');
        const saveBtn = document.getElementById('notesSaveBtn');
        const clearAllBtn = document.getElementById('notesClearAllBtn');
        const status = document.getElementById('notesStatus');

        if (!textarea || !saveBtn || !status) return;

        function showStatus(message, isError) {
            status.textContent = message;
            status.classList.remove('notes-section__status--error');
            if (isError) status.classList.add('notes-section__status--error');
            status.classList.add('notes-section__status--visible');
            setTimeout(() => {
                status.classList.remove('notes-section__status--visible');
            }, 2500);
        }

        // Add new note
        saveBtn.addEventListener('click', () => {
            const text = textarea.value.trim();
            if (!text) {
                showStatus('⚠️ Vui lòng nhập nội dung ghi chú', true);
                return;
            }
            try {
                const notes = getNotes(chapterId);
                notes.push({
                    id: Date.now(),
                    text: text,
                    createdAt: new Date().toISOString()
                });
                saveNotes(chapterId, notes);
                textarea.value = '';
                renderNotesList(chapterId);
                showStatus('✅ Đã thêm ghi chú!', false);
            } catch (e) {
                showStatus('❌ Lỗi khi lưu!', true);
            }
        });

        // Clear all notes
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                const notes = getNotes(chapterId);
                if (notes.length === 0) return;
                if (confirm(`Bạn có chắc muốn xóa tất cả ${notes.length} ghi chú của chương này?`)) {
                    localStorage.removeItem(getNotesKey(chapterId));
                    renderNotesList(chapterId);
                    showStatus('🗑️ Đã xóa tất cả ghi chú', false);
                }
            });
        }

        // Ctrl+Enter to add note
        textarea.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                saveBtn.click();
            }
        });

        // Global edit/delete functions
        window.deleteNote = function (noteId) {
            if (!confirm('Xóa ghi chú này?')) return;
            const notes = getNotes(chapterId);
            const updated = notes.filter(n => n.id !== noteId);
            saveNotes(chapterId, updated);
            renderNotesList(chapterId);
            showStatus('🗑️ Đã xóa ghi chú', false);
        };

        window.editNote = function (noteId) {
            const card = document.querySelector(`.note-card[data-note-id="${noteId}"]`);
            if (!card) return;
            const notes = getNotes(chapterId);
            const note = notes.find(n => n.id === noteId);
            if (!note) return;

            const body = card.querySelector('.note-card__body');
            body.innerHTML = `
                <textarea class="note-card__edit-textarea">${note.text}</textarea>
                <div class="note-card__edit-actions">
                    <button class="note-card__edit-btn note-card__edit-btn--save" onclick="saveEditNote(${noteId})">💾 Lưu</button>
                    <button class="note-card__edit-btn note-card__edit-btn--cancel" onclick="cancelEditNote(${noteId})">Hủy</button>
                </div>`;
            body.querySelector('textarea').focus();
        };

        window.saveEditNote = function (noteId) {
            const card = document.querySelector(`.note-card[data-note-id="${noteId}"]`);
            if (!card) return;
            const editText = card.querySelector('.note-card__edit-textarea').value.trim();
            if (!editText) return;

            const notes = getNotes(chapterId);
            const note = notes.find(n => n.id === noteId);
            if (note) {
                note.text = editText;
                saveNotes(chapterId, notes);
                renderNotesList(chapterId);
                showStatus('✅ Đã cập nhật ghi chú!', false);
            }
        };

        window.cancelEditNote = function (noteId) {
            renderNotesList(chapterId);
        };
    }

})();
