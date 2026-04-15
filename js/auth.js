/* ===================================
   AUTH.JS - Client-side Authentication
   Checks login status and enforces
   role-based UI restrictions.
   =================================== */

(function () {
    'use strict';

    // Current user info (populated after auth check)
    window.currentUser = null;

    // Check authentication on page load
    async function checkAuth() {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();

            if (!res.ok || !data.loggedIn) {
                // Not logged in -> redirect to login
                window.location.href = 'login.html';
                return;
            }

            window.currentUser = data.user;
            onAuthReady(data.user);
        } catch (err) {
            console.error('Auth check failed:', err);
            window.location.href = 'login.html';
        }
    }

    // Called when auth info is available
    function onAuthReady(user) {
        // Inject user info badge + logout button into navbar
        injectUserUI(user);

        // Apply role-based restrictions
        if (user.role === 'user') {
            applyReadOnlyMode();
        }
    }

    // Add user display + logout to navbar
    function injectUserUI(user) {
        const nav = document.querySelector('.navbar__nav');
        if (!nav) return;

        // Create user info container
        const userContainer = document.createElement('div');
        userContainer.className = 'navbar__user';
        userContainer.id = 'navbarUser';

        const isAdmin = user.role === 'admin';
        const roleIcon = isAdmin ? '🛡️' : '📖';
        const roleLabel = isAdmin ? 'Admin' : 'User';
        const roleBadgeClass = isAdmin ? 'navbar__role-badge--admin' : 'navbar__role-badge--user';

        userContainer.innerHTML = `
            <div class="navbar__user-info">
                <span class="navbar__role-badge ${roleBadgeClass}">
                    ${roleIcon} ${roleLabel}
                </span>
                <span class="navbar__username">${user.displayName}</span>
            </div>
            <button class="navbar__logout-btn" id="logoutBtn" title="Đăng xuất">
                🚪 Đăng xuất
            </button>
        `;

        nav.appendChild(userContainer);

        // Logout handler
        document.getElementById('logoutBtn').addEventListener('click', async () => {
            try {
                await fetch('/api/auth/logout', { method: 'POST' });
            } catch (e) { }
            window.location.href = 'login.html';
        });
    }

    // Hide/disable all editing features for read-only users
    function applyReadOnlyMode() {
        // Add a CSS class to body for global styling
        document.body.classList.add('readonly-mode');

        // Run after DOM is rendered at staggered intervals
        hideEditControls();
        setTimeout(hideEditControls, 500);
        setTimeout(hideEditControls, 1500);
        setTimeout(hideEditControls, 3000);
    }

    function hideEditControls() {
        // Hide notes input area (textarea, save btn, clear btn)
        const notesInput = document.querySelector('.notes-input');
        if (notesInput) notesInput.style.display = 'none';

        // Hide note action buttons (edit, delete) on individual notes
        document.querySelectorAll('.note-card__actions').forEach(el => {
            el.style.display = 'none';
        });

        // Hide clear all notes button
        const clearAllBtn = document.getElementById('notesClearAllBtn');
        if (clearAllBtn) clearAllBtn.style.display = 'none';

        // Update notes section description
        const notesDesc = document.querySelector('.notes-section__desc');
        if (notesDesc) {
            notesDesc.textContent = 'Bạn đang xem ở chế độ chỉ đọc. Liên hệ Admin để có quyền chỉnh sửa.';
        }
    }

    // Inject auth-related styles
    function injectAuthStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* User info in navbar */
            .navbar__user {
                display: flex;
                align-items: center;
                gap: 12px;
                margin-left: 16px;
                padding-left: 16px;
                border-left: 1px solid rgba(255, 255, 255, 0.08);
            }

            .navbar__user-info {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .navbar__role-badge {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 4px 12px;
                border-radius: 50px;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.3px;
            }

            .navbar__role-badge--admin {
                background: rgba(108, 99, 255, 0.15);
                border: 1px solid rgba(108, 99, 255, 0.3);
                color: #a5a0ff;
            }

            .navbar__role-badge--user {
                background: rgba(16, 185, 129, 0.12);
                border: 1px solid rgba(16, 185, 129, 0.25);
                color: #6ee7b7;
            }

            .navbar__username {
                font-size: 0.88rem;
                font-weight: 600;
                color: var(--text-heading);
            }

            .navbar__logout-btn {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 7px 14px;
                background: rgba(239, 68, 68, 0.08);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-radius: var(--radius-sm);
                color: #fca5a5;
                font-family: var(--font-sans);
                font-size: 0.8rem;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.15s ease;
            }

            .navbar__logout-btn:hover {
                background: rgba(239, 68, 68, 0.15);
                border-color: rgba(239, 68, 68, 0.4);
                color: #fecaca;
                transform: translateY(-1px);
            }

            /* Read-only mode banner */
            .readonly-mode .notes-section::before {
                content: '🔒 Chế độ chỉ đọc — Bạn không có quyền chỉnh sửa ghi chú';
                display: block;
                padding: 10px 16px;
                background: rgba(245, 158, 11, 0.08);
                border: 1px solid rgba(245, 158, 11, 0.2);
                border-radius: var(--radius-md);
                font-size: 0.85rem;
                color: #fbbf24;
                margin-bottom: 16px;
                text-align: center;
            }

            /* Mobile responsive for auth UI */
            @media (max-width: 768px) {
                .navbar__user {
                    margin-left: 8px;
                    padding-left: 8px;
                    gap: 8px;
                }

                .navbar__username {
                    display: none;
                }

                .navbar__logout-btn {
                    padding: 6px 10px;
                    font-size: 0.75rem;
                }

                .navbar__logout-btn {
                    padding: 6px 8px;
                }
            }

            @media (max-width: 480px) {
                .navbar__user-info {
                    gap: 6px;
                }

                .navbar__role-badge {
                    padding: 3px 8px;
                    font-size: 0.7rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    injectAuthStyles();
    checkAuth();

})();
