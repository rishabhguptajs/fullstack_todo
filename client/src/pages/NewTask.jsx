import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NewTask.css';

const NewTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                due: dueDate
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setTitle('');
            setDescription('');
            setDueDate('');
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        navigate('/');
    }

    return (
        <div className='new-task-container'>
            <h1>New Task</h1>
            <form onSubmit={handleSubmit}>
                <main_div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </main_div>
                <main_div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </main_div>
                <main_div>
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </main_div>
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
}

export default NewTask;
