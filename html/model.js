export class Model {
    constructor() {
        this.usersKey = 'ft_users';
        this.currentKey = 'ft_current';
        this.sessionsKey = 'ft_sessions';
    }

    saveUser(user) {
        const users = JSON.parse(localStorage.getItem(this.usersKey)) || [];
        users.push(user);
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    login(email) {
        const users = JSON.parse(localStorage.getItem(this.usersKey)) || [];
        const user = users.find(u => u.email === email);
        if (user) {
            localStorage.setItem(this.currentKey, JSON.stringify(user));
            return true;
        }
        return false;
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(this.currentKey));
    }

    saveSession(session) {
        const sessions = JSON.parse(localStorage.getItem(this.sessionsKey)) || [];
        sessions.push(session);
        localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
    }
}