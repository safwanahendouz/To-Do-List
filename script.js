function formatTime(value) {
    if (!value) return "";
    const [hours, minutes] = value.split(":");
    const date = new Date();
    date.setHours(+hours, +minutes);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function bindTaskEvents() {
    // Bind delete buttons
    document.querySelectorAll(".delete").forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            this.closest('.task').remove();
        };
    });

    // Bind edit-time buttons
    document.querySelectorAll(".edit-time").forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const task = this.closest('.task');
            const timeDisplay = task.querySelector('.task-time-display');
            const timeEdit = task.querySelector('.task-time-edit');

            if (timeEdit.style.display === 'none' || !timeEdit.style.display) {
                // Show the time input
                timeEdit.style.display = 'inline-flex';
                timeDisplay.style.display = 'none';
                timeEdit.querySelector('input[type="time"]').focus();
            } else {
                // Hide the time input (save on close)
                const newTime = timeEdit.querySelector('input[type="time"]').value;
                timeDisplay.textContent = newTime ? `⏰ ${formatTime(newTime)}` : '';
                timeDisplay.style.display = 'inline';
                timeEdit.style.display = 'none';
            }
        };
    });

    // Bind save-time buttons inside tasks
    document.querySelectorAll(".save-time").forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const task = this.closest('.task');
            const timeDisplay = task.querySelector('.task-time-display');
            const timeEdit = task.querySelector('.task-time-edit');
            const newTime = timeEdit.querySelector('input[type="time"]').value;
            timeDisplay.textContent = newTime ? `⏰ ${formatTime(newTime)}` : '';
            timeDisplay.style.display = 'inline';
            timeEdit.style.display = 'none';
        };
    });

    // Bind task complete toggle
    document.querySelectorAll(".task").forEach(task => {
        task.onclick = function (e) {
            if (!e.target.closest('.delete') && !e.target.closest('.edit-time') && !e.target.closest('.task-time-edit')) {
                this.classList.toggle('completed');
            }
        };
    });
}

document.querySelector('#push').onclick = function () {
    const taskInput = document.querySelector('#NewTask input[type="text"]');
    const timeInput = document.querySelector('#NewTask #taskTime');

    if (taskInput.value.trim().length === 0) {
        alert("Please Enter a Task");
        return;
    }

    const taskName = taskInput.value.trim();
    const taskTime = timeInput ? timeInput.value : "";
    const timeDisplayText = taskTime ? `⏰ ${formatTime(taskTime)}` : '';

    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
        <span class="taskname">${taskName}</span>
        <div class="task-time-wrapper">
            <span class="task-time-display">${timeDisplayText}</span>
            <div class="task-time-edit" style="display:none;">
                <input type="time" value="${taskTime}" />
                <button class="save-time" title="Save time">✔</button>
            </div>
            <button class="edit-time" title="Edit time">✏️</button>
        </div>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

    document.querySelector('#tasks').appendChild(taskDiv);

    bindTaskEvents();

    taskInput.value = "";
    if (timeInput) timeInput.value = "";
};