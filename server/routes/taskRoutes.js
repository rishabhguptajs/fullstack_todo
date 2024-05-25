import express from 'express';

const router = express.Router();
let tasks = []; // In-memory storage for tasks

router.get('/tasks', (req, res) => {
    try {
        res.json({
            tasks,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

router.get('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find(task => task.id === id);

        if (task) {
            res.json({
                task,
                success: true
            });
        } else {
            res.status(404).json({
                message: 'Task not found',
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

router.post('/tasks', (req, res) => {
    try {
        const { title, description, due } = req.body;
        const status = 'Pending';
        const newTask = {
            id: tasks.length + 1,
            title,
            description,
            status,
            due
        };
        tasks.push(newTask);

        res.status(201).json({
            message: 'Task created successfully',
            success: true,
            task: newTask
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

router.put('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description, status } = req.body;
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                id,
                title,
                description,
                status,
                due: tasks[taskIndex].due
            };

            res.json({
                message: 'Task updated successfully',
                success: true,
                task: tasks[taskIndex]
            });
        } else {
            res.status(404).json({
                message: 'Task not found',
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

router.delete('/tasks/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);

            res.json({
                message: 'Task deleted successfully',
                success: true
            });
        } else {
            res.status(404).json({
                message: 'Task not found',
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

export default router;
