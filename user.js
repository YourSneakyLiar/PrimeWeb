document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные пользователя из localStorage (если они есть), иначе устанавливаем значения по умолчанию.
    const username = localStorage.getItem('username') || 'Пользователь';
    const phone = localStorage.getItem('phone') || '+7 (XXX) XXX-XX-XX';
    
    // Отображаем имя пользователя и телефон на странице.
    document.getElementById('username-display').textContent = username;
    document.getElementById('user-phone-display').textContent = phone;
    
    // Обработчик для перехода на главную страницу при клике на кнопку "Домой".
    document.getElementById('go-home').addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Обработчик для выхода из аккаунта. При выходе удаляются данные из localStorage.
    document.getElementById('logout').addEventListener('click', function() {
        if (confirm('Вы уверены, что хотите выйти?')) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('phone');
            window.location.href = 'index.html';
        }
    });
    
    // Обработчики для открытия модального окна для добавления нового бронирования и отправки бронирования.
    document.getElementById('add-booking-btn').addEventListener('click', showAddBookingModal);
    document.getElementById('submit-booking-btn').addEventListener('click', addBooking);
    
    // Обработчик для поиска туров на странице "Туры".
    document.getElementById('search-btn').addEventListener('click', searchTours);
    
    // Загружаем данные о бронированиях.
    loadBookings();

    // Функция для загрузки и отображения примера бронирований.
    function loadBookings() {
        const sampleBookings = {
            active: [
                {
                    id: "BK-2025-001",
                    tourTitle: "Экскурсия по Золотому Кольцу",
                    startDate: "2025-04-15",
                    persons: 2,
                    price: 12500,
                    status: "Confirmed",
                    notes: "Нужен гид, говорящий на английском"
                }
            ],
            completed: [
                {
                    id: "BK-2024-120",
                    tourTitle: "Отдых в Сочи",
                    startDate: "2024-07-10",
                    persons: 3,
                    price: 28400,
                    status: "Completed",
                    notes: ""
                }
            ]
        };
        
        renderBookings(sampleBookings);
    }

    // Функция для рендеринга бронирований на странице.
    function renderBookings(bookings) {
        const activeList = document.getElementById('active-bookings-list');
        const completedList = document.getElementById('completed-bookings-list');
        const lastTripInfo = document.getElementById('last-trip-info');
        
        // Заполнение списка активных бронирований.
        activeList.innerHTML = bookings.active.length > 0 ? 
            bookings.active.map(booking => createBookingCard(booking)).join('') : 
            '<div class="alert alert-info">Нет активных бронирований</div>';
        
        // Заполнение списка завершенных бронирований.
        completedList.innerHTML = bookings.completed.length > 0 ? 
            bookings.completed.map(booking => createBookingCard(booking)).join('') : 
            '<div class="alert alert-info">Нет завершенных бронирований</div>';
        
        // Отображение информации о последней поездке.
        lastTripInfo.innerHTML = bookings.completed.length > 0 ? 
            createBookingCard(bookings.completed[0]) : 
            '<div class="alert alert-info">У вас еще не было поездок</div>';
    }

    // Функция для создания карточки бронирования.
    function createBookingCard(booking) {
        return `
            <div class="card booking-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="card-title">${booking.tourTitle}</h5>
                            <p class="card-text"><strong>Дата:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
                            <p class="card-text"><strong>Количество персон:</strong> ${booking.persons}</p>
                            <p class="card-text"><strong>Статус:</strong> ${getStatusText(booking.status)}</p>
                        </div>
                        <div>
                            ${booking.status === "Confirmed" ? 
                                `<button class="btn btn-danger cancel-booking-btn" data-booking-id="${booking.id}">Отменить</button>` : ''}
                        </div>
                    </div>
                    ${booking.notes ? `<p class="card-text mt-2"><strong>Примечания:</strong> ${booking.notes}</p>` : ''}
                </div>
            </div>
        `;
    }

    // Функция для отображения текста статуса бронирования.
    function getStatusText(status) {
        const statusMap = {
            "Pending": "Ожидает подтверждения",
            "Confirmed": "Подтверждено",
            "Completed": "Завершено",
            "Cancelled": "Отменено"
        };
        return statusMap[status] || status;
    }

    // Функция для отображения модального окна добавления нового бронирования.
    function showAddBookingModal() {
        const tourSelect = document.getElementById('bookingTour');
        tourSelect.innerHTML = '<option value="">-- Выберите тур --</option>';
        
        // Пример доступных туров.
        const sampleTours = [
            {id: 1, title: "Тур по Золотому Кольцу", price: 12500},
            {id: 2, title: "Отдых в Сочи", price: 28400},
            {id: 3, title: "Экскурсия по Санкт-Петербургу", price: 18700}
        ];
        
        // Добавление туров в выпадающий список.
        sampleTours.forEach(tour => {
            const option = document.createElement('option');
            option.value = tour.id;
            option.textContent = `${tour.title} (${tour.price} руб.)`;
            tourSelect.appendChild(option);
        });
        
        // Открытие модального окна.
        const modal = new bootstrap.Modal(document.getElementById('addBookingModal'));
        modal.show();
    }

    // Функция для добавления нового бронирования.
    function addBooking() {
        const tourSelect = document.getElementById('bookingTour');
        const dateInput = document.getElementById('bookingDate');
        const personsInput = document.getElementById('bookingPersons');
        const notesInput = document.getElementById('bookingNotes');
        
        // Проверка на заполненность обязательных полей.
        if (!tourSelect.value || !dateInput.value || !personsInput.value) {
            alert('Пожалуйста, заполните все обязательные поля');
            return;
        }
        
        // Подтверждение добавления бронирования.
        alert('Бронирование добавлено!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('addBookingModal'));
        modal.hide();
        
        // Перезагружаем список бронирований.
        loadBookings();
    }

    // Функция для поиска туров по фильтрам.
    function searchTours() {
        const city = document.getElementById('search-city').value;
        const date = document.getElementById('search-date').value;
        const persons = document.getElementById('search-persons').value;
        
        // Перенаправление на страницу с результатами поиска.
        window.location.href = `tours.html?city=${city}&date=${date}&persons=${persons}`;
    }

    // Обработчик клика по кнопке отмены бронирования.
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('cancel-booking-btn')) {
            if (confirm('Вы уверены, что хотите отменить бронирование?')) {
                // Подтверждение отмены бронирования.
                alert('Бронирование отменено!');
                loadBookings();
            }
        }
    });
});
