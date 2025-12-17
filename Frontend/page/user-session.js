// user-session.js - Підключи цей файл на всі сторінки

// Функція для перевірки та відображення користувача
function initUserSession() {
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const navRight = document.getElementById('navRight');

    if (!navRight) return;

    // Перевіряємо, чи це сторінка профілю
    const currentPage = window.location.pathname.split('/').pop();
    const isProfilePage = currentPage === 'profile.html';

    if (isLoggedIn && userData.avatar) {
        // Користувач залогінений
        if (isProfilePage) {
            // На сторінці профілю - показуємо профіль і кнопку виходу
            navRight.innerHTML = `
                <button class="profile-btn" id="profileBtn" title="Профіль">
                    ${userData.avatar}
                </button>
                <button class="logout-btn" id="logoutBtn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Вихід
                </button>
            `;

            // Обробник для кнопки профілю
            document.getElementById('profileBtn').addEventListener('click', () => {
                location.reload();
            });

            // Обробник для кнопки виходу
            document.getElementById('logoutBtn').addEventListener('click', () => {
                if (confirm('Ви впевнені, що хочете вийти?')) {
                    localStorage.removeItem('userLoggedIn');
                    localStorage.removeItem('userData');
                    window.location.href = 'home.html';
                }
            });
        } else {
            // На інших сторінках - тільки профіль
            navRight.innerHTML = `
                <button class="profile-btn" id="profileBtn" title="Профіль">
                    ${userData.avatar}
                </button>
            `;

            // Обробник для кнопки профілю
            document.getElementById('profileBtn').addEventListener('click', () => {
                window.location.href = 'profile.html';
            });
        }
    } else {
        // Користувач не залогінений - показуємо кнопки входу
        navRight.innerHTML = `
            <button class="login-btn" onclick="window.location.href='login.html'">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Вхід
            </button>

        `;
    }
}

// Функція для оновлення статистики тестів
function updateTestStats(isCorrect) {
    // Отримуємо поточну статистику
    const stats = JSON.parse(localStorage.getItem('userStats') || '{"totalQuestions":0,"correctAnswers":0,"wrongAnswers":0}');
    
    // Оновлюємо дані
    stats.totalQuestions++;
    if (isCorrect) {
        stats.correctAnswers++;
    } else {
        stats.wrongAnswers++;
    }
    
    // Зберігаємо назад в localStorage
    localStorage.setItem('userStats', JSON.stringify(stats));
    
    console.log('Статистика оновлена:', stats);
}

// Функція для скидання статистики (якщо потрібно)
function resetTestStats() {
    localStorage.setItem('userStats', JSON.stringify({
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0
    }));
    console.log('Статистика скинута');
}

// Функція для отримання статистики
function getTestStats() {
    return JSON.parse(localStorage.getItem('userStats') || '{"totalQuestions":0,"correctAnswers":0,"wrongAnswers":0}');
}

// Викликаємо при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initUserSession);

// Експортуємо функції для використання на інших сторінках
window.userSession = {
    init: initUserSession,
    updateStats: updateTestStats,
    resetStats: resetTestStats,
    getStats: getTestStats
};