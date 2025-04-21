

const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const bcryptjs = require('bcryptjs'); // Исправлено: используем bcryptjs
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Проверка существования директории и файлов
const projectDir = __dirname;
console.log('Project directory:', projectDir);
if (!fs.existsSync(projectDir)) {
    console.error('Project directory does not exist:', projectDir);
    process.exit(1);
}

// Статическое раздача фронтенда
app.use(express.static(projectDir));

const dbConfig = {
    server: "ExcursionBDCloud.mssql.somee.com",
    database: "ExcursionBDCloud",
    user: "YourSneakyLiar_SQLLogin_1",
    password: "b51odpedu3",
    options: {
      trustServerCertificate: true
    }
  };

// Подключение к базе данных
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Connected to SQL Server database using Windows Authentication');
    }

    // API для регистрации пользователя
    app.post('/api/register', async (req, res) => {
        try {
            const { username, password, email } = req.body;

            // Хэширование пароля с использованием bcryptjs
            const saltRounds = 10;
            const passwordHash = await bcryptjs.hash(password, saltRounds);

            // Вставка данных в таблицу dbo.Users
            const request = pool.request();
            const query = `
                INSERT INTO dbo.Users (Username, PasswordHash, Email, RoleID, CreatedAt)
                VALUES (@username, @passwordHash, @email, @roleId, GETDATE())
            `;
            request.input('username', sql.VarChar(50), username);
            request.input('passwordHash', sql.VarChar(200), passwordHash);
            request.input('email', sql.VarChar(100), email);
            request.input('roleId', sql.Int, 1);

            await request.query(query);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Error inserting user:', err);
            res.status(500).json({ error: err.message || 'Failed to register user' });
        }
    });

}).catch(err => {
    console.error('Database connection failed:', err);
    console.log('Server will run without database connection for testing purposes.');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});