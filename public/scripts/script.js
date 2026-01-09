let greating = "Hello ";
greating += localStorage.getItem('name');
document.getElementById('greating').innerHTML = greating;
let allCategories = [];
let allTasks = [];

async function getTasks() {
    try {
        let response = await fetch('/tasks');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if (response.status == 400) {
            alert(data.message);
            return;
        }
        allTasks = data;
        createTable(data);
    } catch (err) {
        alert(err)
    }
}

async function getCategories() {
    try {
        let response = await fetch('/categories');
        if (response.status == 401) {
            window.location.href = '/login';
            return;
        }
        let data = await response.json();
        if (response.status == 400) {
            alert(data.message);
            return;
        }
        for (let c of data) {
            allCategories[c.id] = c;
        }
        createSelect(allCategories);
    } catch (err) {
        alert(err)
    }
}

function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let isChecked = obj.is_done ? "checked" : "";
            let rowClass = obj.is_done ? "class='rowClass'" : "";
            let catName = allCategories[obj.category_id] ? allCategories[obj.category_id].name : '--';
            txt += `<tr ${rowClass}>`;
            txt += `<td><input type="checkbox" ${isChecked} onchange="taskDone(${obj.id},this)"></td>`;
            txt += `<td>${obj.text}</td>`;
            txt += `<td>${catName}</td>`;
            txt += `<td><button onclick="deleteTask(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="taskToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
}

function createSelect(data) {
    let txt = `<option value="0">All</option>`;
    for (obj of data) {
        if (obj) {
            txt += `<option value="${obj.id}">${obj.name}</option>`;
        }
    }
    document.getElementById('mySelect').innerHTML = txt;
}

function sortTable() {
    let val = document.getElementById('mySelect').value;
    if (val == 0) {
        createTable(allTasks);
    } else {
        let sorted = allTasks.filter(task => task.category_id == val);
        createTable(sorted);
    }
}

async function taskDone(id, elm) {
    let isDone = elm.checked;
    try {
        let response = await fetch(`/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone })
        })
        getTasks();
    } catch (err) {
        alert(err)
    }
}

async function deleteTask(id) {
    try {
        let response = await fetch(`/tasks/${id}`,{
            method:'DELETE'
        })
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        }
        getTasks();
    } catch (err) {
        alert(err)
    }
}

getCategories();
getTasks();