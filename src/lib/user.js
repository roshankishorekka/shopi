import { writable } from 'svelte/store';
import { getDbConnection, logEvent } from './db';

// Initial state from localStorage
const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : null;

export const user = writable(initialUser);

export const login = async (email, password) => {
    const conn = await getDbConnection();

    // In a real app, password should be hashed. Here we compare plain text for demo.
    const result = await conn.query(`
        SELECT * FROM users WHERE email = '${email}' AND password = '${password}'
    `);

    const users = result.toArray();

    if (users.length > 0) {
        const loggedInUser = users[0].toJSON();
        user.set(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        await logEvent('login', loggedInUser.id);
        return loggedInUser;
    } else {
        throw new Error('Invalid credentials');
    }
};

export const signup = async (name, email, password) => {
    const conn = await getDbConnection();

    // Check if user exists
    const check = await conn.query(`SELECT count(*) as count FROM users WHERE email = '${email}'`);
    if (check.toArray()[0].count > 0) {
        throw new Error('Email already exists');
    }

    const id = crypto.randomUUID();
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`;

    await conn.query(`
        INSERT INTO users (id, name, email, password, avatar, role) 
        VALUES ('${id}', '${name}', '${email}', '${password}', '${avatar}', 'user')
    `);

    const newUser = { id, name, email, avatar, role: 'user' };
    user.set(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    await logEvent('signup', id);
    return newUser;
};

export const logout = async () => {
    const currentUser = initialUser; // Simplified, ideally get from store value
    if (currentUser) {
        await logEvent('logout', currentUser.id);
    }
    user.set(null);
    localStorage.removeItem('user');
    window.location.href = '/';
};
