import React, { useState } from 'react';
import { Input, Button, List, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState(null);

    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!inputValue) return;
        const newTodo = {
            id: Date.now(),
            text: inputValue,
        };
        setTodos([...todos, newTodo]);
        setInputValue('');
    }

    function handleEdit(todo) {
        setIsModalVisible(true);
        setTodoToEdit(todo);
    }

    function handleDelete(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function handleOk() {
        const editedTodo = { ...todoToEdit, text: inputValue };
        const updatedTodos = todos.map(todo => (todo.id === editedTodo.id ? editedTodo : todo));
        setTodos(updatedTodos);
        setInputValue('');
        setIsModalVisible(false);
        setTodoToEdit(null);
    }

    function handleCancel() {
        setInputValue('');
        setIsModalVisible(false);
        setTodoToEdit(null);
    }

    return (
        <div className="todo-container">
            <h1 className='title'> Demo</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Add"
                    value={inputValue}
                    onChange={handleInputChange}
                    suffix={
                        <Button type="primary"  icon={<PlusOutlined />} />
                    }
                />
            </form>
            <List
                className="todo-list"
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={todo => (
                    <List.Item
                        actions={[
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(todo)}
                            />,
                            <Button
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(todo.id)}
                            />
                        ]}
                    >
                        <List.Item.Meta
                            title={todo.text}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                        />
                    </List.Item>
                )}
            />
            <Modal
                title="Edit Todo"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    placeholder="Edit task"
                    value={inputValue}
                    onChange={handleInputChange}
                    defaultValue={todoToEdit && todoToEdit.text}
                />
            </Modal>
        </div>
    );
}

export default TodoList;