let greating = "Hello ";
greating += localStorage.getItem('name') || '';
document.getElementById('greating').innerHTML = greating;

let allCategories = {};
let allTasks = [];



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

        
        
        allCategories = data || [];
        createTable(allCategories);

        

    } catch (err) {
        alert(err);
    }
}



function createTable(data) {
    let txt = "";
    for (obj of data) {
        if (obj) {
            let name = obj.name;
            // let catName = allCategories[obj.category_id] ? allCategories[obj.category_id].name : '--';
            txt += `<tr>`;
            txt += `<td>${name}</td>`;
            txt += `<td><button onclick="deleteCat(${obj.id})">🗑️</button></td>`;
            txt += `<td><button onclick="CatToEdit(${obj.id})">✏️</button></td>`;
            txt += "</tr>";
        }
    }
    document.getElementById('myTable').innerHTML = txt;
    
}



async function addCat() {
    let name = document.getElementById('text').value;
    let category_id = document.getElementById('mySelect').value;

    if (category_id == 0) {
        category_id = null;
    }

    await fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category_id })
    });

    getCategories();
    document.getElementById('text').value = "";
}


async function deleteCat(id) {
    try{
    let response = await fetch(`/categories/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    

    let data = await response.json();
    if (!response.ok) {
        alert(data.message);
        return;
    }
    getCategories();




    } catch(err){
        alert(err);
    }

    
}

async function taskToEdit(id) {
    let response = await fetch(`/tasks/${id}`, {
        credentials: 'include'
    });

    let data = await response.json();

    if (!response.ok) {
        alert(data.message);
        return;
    }

    document.getElementById('id').value = data.id;
    document.getElementById('text').value = data.text;
}

async function editcat(id) {
    let text = document.getElementById('text').value;

    await fetch(`/categories/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text }),
    });

    document.getElementById('id').value = "";
    document.getElementById('text').value = "";
    getCategories();
}

function addOrEdit() {
    let id = document.getElementById('id').value;
    if (id) {
        editcat(id);
    } else {
        addCat();
    }
}



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
}



getCategories();
getTasks();