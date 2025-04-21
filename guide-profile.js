// Ожидание полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', function() {

    // Получаем имя пользователя из localStorage или устанавливаем значение по умолчанию
    const username = localStorage.getItem('username') || 'Пользователь';

    // Получаем номер телефона пользователя из localStorage или устанавливаем значение по умолчанию
    const phone = localStorage.getItem('phone') || '+7 (XXX) XXX-XX-XX';

    // Выводим имя пользователя в элемент с id="username-display"
    document.getElementById('username-display').textContent = username;

    // Выводим номер телефона в элемент с id="user-phone-display"
    document.getElementById('user-phone-display').textContent = phone;

    // Загружаем профиль гида
    loadGuideProfile();

    // Функция загрузки данных профиля гида
    function loadGuideProfile() {
        // В реальном приложении здесь обычно отправляется запрос на сервер (например, fetch)
        const guideData = {
            name: "Иван Петров", // Имя гида
            rating: 4.8,         // Рейтинг гида
            tourCount: 15,       // Общее количество проведённых туров
            bio: "Опытный гид с 10-летним стажем. Специализируюсь на исторических турах.", // Биография
            tours: [             // Список туров
                { id: 1, title: "Тур по Золотому Кольцу", price: 12500, startDate: "2025-04-15" }
            ],
            reviews: [           // Список отзывов
                { user: "user1", rating: 5, comment: "Отличный гид!", date: "2025-03-20" }
            ]
        };

        // Отображаем имя гида
        document.getElementById('guide-name').textContent = guideData.name;

        // Отображаем рейтинг гида
        document.getElementById('guide-rating').textContent = guideData.rating;

        // Отображаем количество туров
        document.getElementById('guide-tour-count').textContent = guideData.tourCount;

        // Отображаем биографию гида
        document.getElementById('guide-bio').textContent = guideData.bio;

        // Отрисовываем список туров
        renderTours(guideData.tours);

        // Отрисовываем список отзывов
        renderReviews(guideData.reviews);
    }

    // Функция для отображения туров гида
    function renderTours(tours) {
        const toursList = document.getElementById('guide-tours-list');

        // Если туры есть, создаём карточки, иначе выводим сообщение об отсутствии
        toursList.innerHTML = tours.length > 0 ?
            tours.map(tour => `
                <div class="card booking-card">
                    <div class="card-body">
                        <h5 class="card-title">${tour.title}</h5>
                        <p><strong>Дата:</strong> ${new Date(tour.startDate).toLocaleDateString()}</p>
                        <p><strong>Цена:</strong> ${tour.price} руб.</p>
                    </div>
                </div>
            `).join('') :
            '<div class="alert alert-info">Нет доступных туров</div>';
    }

    // Функция для отображения отзывов о гиде
    function renderReviews(reviews) {
        const reviewsList = document.getElementById('guide-reviews-list');

        // Если отзывы есть, создаём карточки, иначе выводим сообщение об отсутствии
        reviewsList.innerHTML = reviews.length > 0 ?
            reviews.map(review => `
                <div class="card review-card">
                    <div class="card-body">
                        <h6>${review.user}</h6>
                        <p><strong>Оценка:</strong> ${review.rating}/5</p>
                        <p>${review.comment}</p>
                        <small>${new Date(review.date).toLocaleDateString()}</small>
                    </div>
                </div>
            `).join('') :
            '<div class="alert alert-info">Отзывов пока нет</div>';
    }

});
