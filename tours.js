document.addEventListener('DOMContentLoaded', function() {
    // Установка минимальной даты (сегодня) для поля выбора даты
    const today = new Date().toISOString().split('T')[0];
    const tourDateInput = document.getElementById('search-date');
    tourDateInput.setAttribute('min', today); // нельзя выбрать дату раньше сегодняшней

    // Загрузка данных пользователя из localStorage и отображение на странице
    const username = localStorage.getItem('username') || 'Пользователь';
    const phone = localStorage.getItem('phone') || '+7 (XXX) XXX-XX-XX';
    const address = localStorage.getItem('userAddress') || 'Адрес';
    const city = localStorage.getItem('city') || 'Город';
    document.getElementById('username-display').textContent = username;
    document.getElementById('user-phone-display').textContent = phone;
    document.getElementById('address-text').textContent = address;
    document.getElementById('city-text').textContent = city;

    // Получение параметров из URL (город, дата, ID тура)
    const urlParams = new URLSearchParams(window.location.search);
    const urlCity = urlParams.get('city'); // Город из URL
    const date = urlParams.get('date'); // Дата из URL
    const tourId = urlParams.get('tourId'); // ID тура для фильтрации

    // Установка значений в поля ввода на основе параметров из URL
    if (urlCity) document.getElementById('search-tour').value = urlCity;
    if (date) document.getElementById('search-date').value = date;

    // Назначение обработчика на кнопку поиска
    document.getElementById('search-btn').addEventListener('click', searchTours);

    // Загрузка туров
    loadTours();

    // Функция загрузки туров (в реальности заменяется API-запросом)
    function loadTours() {
        const sampleTours = [ // Пример данных туров
            {
                id: 1,
                title: "Тур по Золотому Кольцу",
                description: "Исторический тур по древним городам России",
                price: 12500,
                startDate: "2025-04-15",
                image: "https://via.placeholder.com/300x200"
            },
            {
                id: 2,
                title: "Отдых в Сочи",
                description: "Морской тур с экскурсиями",
                price: 28400,
                startDate: "2025-05-01",
                image: "https://via.placeholder.com/300x200"
            }
        ];

        // Если указан tourId, отфильтровываем тур по ID
        if (tourId) {
            const filteredTour = sampleTours.find(t => t.id == tourId);
            renderTours(filteredTour ? [filteredTour] : []);
        } else {
            renderTours(sampleTours); // Иначе показываем все туры
        }
    }

    // Функция отображения туров на странице
    function renderTours(tours) {
        const toursList = document.getElementById('tours-list');
        toursList.innerHTML = tours.length > 0 ?
            tours.map(tour => `
                <div class="col-md-4 mb-4">
                    <div class="card tour-card" data-tour-id="${tour.id}">
                        <img src="${tour.image}" alt="${tour.title}" class="card-img-top">
                        <div class="card-body tour-card-body">
                            <h5 class="card-title" style="color: #4CAF50; font-weight: bold;">${tour.title}</h5>
                            <p class="tour-card-text">${tour.description}</p>
                            <p><strong>Дата:</strong> ${new Date(tour.startDate).toLocaleDateString()}</p>
                            <p><strong>Цена:</strong> ${tour.price} руб.</p>
                            <button class="btn btn-success book-tour-btn" data-tour-id="${tour.id}">Забронировать</button>
                            <a href="guide.html?tourId=${tour.id}" class="btn btn-success mt-2">Подробнее</a>
                        </div>
                    </div>
                </div>
            `).join('') :
            // Если туров нет — показываем сообщение
            '<div class="col-12"><div class="alert alert-info">Туров не найдено</div></div>';
    }

    // Функция обработки поиска туров
    function searchTours() {
        const title = document.getElementById('search-tour').value; // Название/город
        const date = document.getElementById('search-date').value; // Дата

        // Проверка: если выбрана дата из прошлого — выводим предупреждение
        if (date && new Date(date) < new Date(today)) {
            alert('Дата экскурсии не может быть в прошлом.');
            return;
        }

        // Сообщение о параметрах поиска и переход на страницу с фильтрами
        alert(`Поиск: Название - ${title || 'не указано'}, Дата - ${date || 'не указана'}`);
        window.location.href = `tours.html?city=${title}&date=${date}`;
    }

    // Обработка клика по кнопке "Забронировать тур"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('book-tour-btn')) {
            const tourId = e.target.getAttribute('data-tour-id');
            alert(`Забронирован тур с ID: ${tourId}`);
            // Здесь можно реализовать переход на страницу бронирования
        }
    });

    // Обработка клика по карточке тура (если это не кнопка или ссылка)
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Переход на страницу гида при клике по карточке
            if (e.target.tagName !== 'A' && !e.target.classList.contains('book-tour-btn')) {
                const tourId = this.dataset.tourId;
                window.location.href = `guide.html?tourId=${tourId}`;
            }
        });
    });
});
