const {
    getAll,
    add,
    getOne,
    update,
    removeWithTasks
} = require('../model/categories_M.js');


async function getAllCategories(req, res) {
    try {
        let categories = await getAll(req.user.id);
        res.status(200).json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}
async function addCategory(req, res) {
    try {
        let name = req.body.name;
        let userId = req.user.id;

        let categoryId = await add({ name, userId });
        if (!categoryId) {
            return res.status(500).json({ message: "Server error" });
        }
        res.status(201).json({ message: "נוסף בהצלחה" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


async function getCategory(req, res) {
    try {
        let category = await getOne(req.params.id, req.user.id);
        if (!category) {
            return res.status(400).json({ message: "category not found" });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}


async function deleteCategory(req, res) {
    try {
        let affectedRows = await removeWithTasks(
            req.params.id,
            req.user.id
        );
        if (!affectedRows) {
            return res.status(400).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "deleted!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}


async function updateCategory(req, res) {
    try {
        let affectedRows = await update(
            req.params.id,
            req.user.id,
            req.body.name
        );
        if (!affectedRows) {
            return res.status(400).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "updated!" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getAllCategories,
    addCategory,
    getCategory,
    deleteCategory,
    updateCategory,
};