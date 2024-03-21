import { Pool } from 'pg'

const pool = new Pool({
    connectionString: process.env.USERS_DB_CONNECTION_STRING
});

export const createUser = async (name: string, email: string, password: string) => {
    const client = await pool.connect()
    const result = await client.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, password])
    client.release()
    return result
}

export async function authenticateUser(name: string, password: string) {
    try {
        // Запрос к базе данных для поиска пользователя по имени
        const userQuery = await pool.query('SELECT * FROM users WHERE name = $1', [name]);
        const user = userQuery.rows[0];

        if (!user) {
            return 'неверный логин или пароль'
        }

        if (user.password !== password) {
            // Неверный пароль
            return 'неверный логин или пароль'
        }

        // Генерируем уникальную строку session_id
        const sessionId = user.name;

        // Обновляем поле session_id в базе данных
        await pool.query('UPDATE users SET session_id = $1 WHERE id = $2', [sessionId, user.id]);

        // Запрос к базе данных для получения всех данных пользователя
        const userDataQuery = await pool.query('SELECT * FROM users WHERE id = $1', [user.id]);
        const userData = userDataQuery.rows[0];
        console.log(userData)
        return userData;
    } catch (error: any) {
        throw new Error('Ошибка аутентификации: ' + error.message);
    }
}

export async function getUserBySessionId (sessionId: string) {
    try {
        // Запрос к базе данных для поиска пользователя по имени
        const userQuery = await pool.query('SELECT * FROM users WHERE session_id = $1', [sessionId]);
        const user = userQuery.rows[0];

        if (!user) {
            // Пользователь с заданным именем не найден
            throw new Error('Пользователь не найден');
        }
        return user;
    } catch (error: any) {
        throw new Error('Ошибка аутентификации: ' + error.message);
    }
}

export async function deleteUserSession(sessionId: string) {
    try {
        // Запрос к базе данных для поиска пользователя по имени
        const userQuery = await pool.query('SELECT * FROM users WHERE session_id = $1', [sessionId]);
        const user = userQuery.rows[0];

        if (!user) {
            return 'пользватель не найден'
        }
        await pool.query('UPDATE users SET session_id = $1 WHERE id = $2', [null, user.id]);

    } catch (error: any) {
        throw new Error('Ошибка аутентификации: ' + error.message);
    }
}
