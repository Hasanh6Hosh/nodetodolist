let greating = "Hello ";
greating += localStorage.getItem('name') || '';
document.getElementById('greating').innerHTML = greating;

let allCategories = {};
let allTasks = [];

/* =======================
   LOAD DATA
======================= */

async function getCategories() {
    try {
        let response = await fetch('/categories');

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        let data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        allCategories = {};
        for (let c of data) {
            allCategories[c.id] = c;
        }

        createSelect(allCategories);

    } catch (err) {
        alert(err);
    }
}

async function getTasks() {
    try {
        let response = await fetch('/tasks', {
            credentials: 'include'
        });

        if (response.status === 401) {
            window.location.href = '/login';
            return;
        }

        let data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        allTasks = data;
        createTable(allTasks);

    } catch (err) {
        alert(err);
    }
}

/* =======================
   UI BUILD
======================= */

function createSelect(data) {
    let txt = `<option value="0">All</option>`;
    for (let id in data) {
        txt += `<option value="${id}">${data[id].name}</option>`;
    }
    document.getElementById('mySelect').innerHTML = txt;
}
function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let isChecked = obj.is_done ? "checked" : "";
            let rowClass = obj.is_done ? "class='rowClass'" : "";
            console.log(obj.category_id, allCategories);

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


/* =======================
   FILTER
======================= */

function sortTable() {
    let val = document.getElementById('mySelect').value;
    if (val == 0) {
        createTable(allTasks);
    } else {
        let sorted = allTasks.filter(task => task.category_id == val);
        createTable(sorted);
    }
}

/* =======================
   TASK CRUD
======================= */

async function addTask() {
    let text = document.getElementById('text').value;
    let category_id = document.getElementById('mySelect').value;
    
    if (category_id == 0) {
        category_id = null;
    }

    await fetch('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, category_id })
    });

    getTasks();
    document.getElementById('text').value = "";
}

async function taskDone(id, elm) {
    await fetch(`/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isDone: elm.checked })
    });

    getTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    getTasks();
}
async function taskToEdit(id) {
    try {
        let response = await fetch(`/tasks/${id}`);
        let data = await response.json();
        if(!response.ok){
            alert(data.message);
        }else{
            document.getElementById('id').value = data.id;
            document.getElementById('text').value = data.text;
        }
    } catch (err) {
        alert(err)
    }
}

async function editTask(id) {
    try {
        let text = document.getElementById('text').value;        
        let response = await fetch(`/tasks/${id}`,{
            method:'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text})
        })
        document.getElementById('text').value = "";
        getTasks();
        
    } catch (err) {
        alert(err)
    }
}

function addOrEdit(){
    let id = document.getElementById('id').value;
    if(id){
        editTask(id);
        
    }else{
        addTask();
    }
    document.getElementById('id').value = "";
}
/* =======================
   CATEGORY DELETE
======================= */

async function deleteCategory(id) {

    if (!confirm('ימחקו גם כל המשימות של הקטגוריה. להמשיך?')) {
        return;
    }

    let response = await fetch(`/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    let data = await response.json();
    if (!response.ok) {
        alert(data.message);
    }

    getCategories();
    getTasks();
}

/* =======================
   INIT
======================= */
async function init() {
    await getCategories();
    await getTasks();
}

init();