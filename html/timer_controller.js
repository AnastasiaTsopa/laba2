class TimerController {
    constructor() {
        this.timerValue = 0;
        this.interval = null;
        this.display = document.getElementById('timer-display');
        this.init();
    }

    init() {
        if (!this.display) return;

        document.getElementById('start-btn').addEventListener('click', () => this.start());
        document.getElementById('pause-btn').addEventListener('click', () => this.pause());
        document.getElementById('stop-btn').addEventListener('click', () => this.stop());
        document.getElementById('save-btn').addEventListener('click', () => this.save());

        this.renderHistory();
    }

    start() {
        if (this.interval) return;
        this.interval = setInterval(() => {
            this.timerValue++;
            this.updateDisplay();
        }, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.interval = null;
    }

    stop() {
        this.pause();
        this.timerValue = 0;
        this.updateDisplay();
    }

    updateDisplay() {
        const h = String(Math.floor(this.timerValue / 3600)).padStart(2, '0');
        const m = String(Math.floor((this.timerValue % 3600) / 60)).padStart(2, '0');
        const s = String(this.timerValue % 60).padStart(2, '0');
        this.display.textContent = `${h}:${m}:${s}`;
    }

    save() {
        const name = document.getElementById('task-name').value || 'Без назви';
        
        const session = { 
            task: name, 
            time: this.display.textContent,
            date: new Date().toLocaleDateString('uk-UA')
        };
        
        let sessions = JSON.parse(localStorage.getItem('focus_sessions')) || [];
        sessions.push(session);
        localStorage.setItem('focus_sessions', JSON.stringify(sessions));
        
        document.getElementById('task-name').value = '';
        
        this.renderHistory();
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        if (!historyList) return;

        let sessions = JSON.parse(localStorage.getItem('focus_sessions')) || [];
        
        historyList.innerHTML = ''; 

        if (sessions.length === 0) {
            historyList.innerHTML = '<li class="list-group-item text-center text-muted border-0">Немає збережених сеансів</li>';
            return;
        }

        sessions.slice().reverse().forEach(session => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center px-0';
            
            li.innerHTML = `
                <div>
                    <strong>${session.task}</strong>
                    <div class="text-muted" style="font-size: 0.8rem;">${session.date || ''}</div>
                </div>
                <span class="badge bg-danger rounded-pill fs-6">${session.time}</span>
            `;
            historyList.appendChild(li);
        });
    }
}

new TimerController();