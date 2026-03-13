const regForm = document.getElementById('reg-form');
const loginForm = document.getElementById('login-form');

if (regForm) {
    regForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        
        localStorage.setItem('focus_user_name', name);
        localStorage.setItem('focus_user_email', email);
        
        alert('Реєстрація успішна! Тепер увійдіть у систему.');
        window.location.href = 'login.html';
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const inputEmail = document.getElementById('login-email').value;
        
        const savedEmail = localStorage.getItem('focus_user_email');
        
        if (inputEmail === savedEmail) {
            alert('Вхід успішний! Вітаємо, ' + localStorage.getItem('focus_user_name'));
            window.location.href = 'profile.html'; 
        } else {
            alert('Помилка: Користувача з таким Email не знайдено! Зареєструйтесь спочатку.');
        }
    });
}