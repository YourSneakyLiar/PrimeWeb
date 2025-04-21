document.addEventListener('DOMContentLoaded', function() {
    // Функция для загрузки данных пользователя на всех страницах
    function loadUserData() {
        // Загружаем данные из localStorage
        const username = localStorage.getItem('username') || 'Пользователь'; // Получаем имя пользователя или используем "Пользователь"
        const phone = localStorage.getItem('phone') || '+7 (926) 865-86-12'; // Получаем номер телефона или значение по умолчанию
        const address = localStorage.getItem('userAddress') || 'Адрес'; // Получаем адрес или "Адрес"
        const city = localStorage.getItem('city') || 'Город'; // Получаем город или "Город"
        
        // Обновляем элементы на странице, отображающие имя пользователя
        const usernameElements = document.querySelectorAll('#username-display, #auth-text');
        usernameElements.forEach(el => {
            if (el) el.textContent = username !== 'Пользователь' ? username : 'Войти/зарегистрироваться'; // Если имя задано — отображаем, иначе предлагаем авторизацию
        });
        
        // Обновляем элементы с номером телефона
        const phoneElements = document.querySelectorAll('#user-phone-display');
        phoneElements.forEach(el => {
            if (el) el.textContent = phone;
        });
        
        // Обновляем элементы с адресом
        const addressElements = document.querySelectorAll('#address-text');
        addressElements.forEach(el => {
            if (el) el.textContent = address;
        });
        
        // Обновляем элементы с городом
        const cityElements = document.querySelectorAll('#city-text');
        cityElements.forEach(el => {
            if (el) el.textContent = city;
        });
    }

    // Запускаем загрузку данных после загрузки DOM
    loadUserData();
});
