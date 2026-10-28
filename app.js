const form = document.getElementById('add-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-check';
        checkbox.checked = Boolean(task.done);
        checkbox.dataset.index = index;
        checkbox.setAttribute('aria-label', task.text);

        const text = document.createElement('span');
        text.className = 'task-text';
        text.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.index = index;
        deleteBtn.textContent = 'Delete';

        li.append(checkbox, text, deleteBtn);
        list.appendChild(li);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        tasks.push({ text, createdAt: Date.now() });
        saveTasks();
        renderTasks();
        input.value = '';
    }
});

list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = parseInt(e.target.dataset.index, 10);
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});

list.addEventListener('change', (e) => {
    if (e.target.classList.contains('task-check')) {
        const index = parseInt(e.target.dataset.index, 10);
        tasks[index].done = e.target.checked;
        renderTasks();
    }
});

renderTasks();
