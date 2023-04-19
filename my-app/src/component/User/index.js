import React, { useState } from 'react';
import data from '../../data';
import './style.css';
import ModalForm from './ModalForm';
import { Layout, Table, Space, Button, Modal, message, Typography } from 'antd';

const { Column } = Table;
const { Header, Content } = Layout;

function User() {
    const [listUser, setListUsers] = useState(data.users);
    const [editingUser, setEditingUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = () => {
        setEditingUser(null);
        setShowModal(true);
    }
    const handleEdit = (item) => {
        setEditingUser(item);
        setShowModal(true);
    }
    const handleDelete = (item) => {
        Modal.confirm({
            title: "Do you want to delete this user?",
            okText: "Yes",
            onOk: () => {
                setListUsers((e) => {
                    return e.filter((user) => user.id !== item.id)
                });
            }
        })
    }
    const handleSaveUser = (item) => {
        if (editingUser) {
            const updatedUsers = listUser.map((u) => {
                if (u.id === editingUser.id) {
                    return { ...u, ...item };
                }
                return u;
            });
            message.success("Edit success")
            setListUsers(updatedUsers);
        } else {
            const newUser = { ...item, id: listUser.length + 1 };
            setListUsers([newUser, ...listUser]);
            message.success("Add success")
        }
        setShowModal(false);
    };
    return (
        <Layout className="layout">
            <Header></Header>
            <Content>

                <Typography.Title style={{padding: '0 25px'}}>Manager User</Typography.Title>
                <div className='container-content'>
                    <div className='content-button'>
                        <Button onClick={() => handleAdd()} className='add-btn'>Add User</Button>
                    </div>
                    <Table dataSource={listUser} pagination={{ pageSize: 5 }}>
                        <Column title="Full Name" dataIndex="fullname" key='fullname' />
                        <Column title="UserName" dataIndex="username" key='username' />
                        <Column title="Gmail" dataIndex="gmail" key='gmail' />
                        <Column title="Gender" dataIndex="gender" key='gender' />
                        <Column title="Address" dataIndex="address" key='address' />
                        <Column title="Phone" dataIndex="phone" key='phone' />
                        <Column
                            title="Action"
                            key="action"
                            render={(item) => (
                                <Space size="middle">
                                    <Button onClick={() => handleEdit(item)}>Edit</Button>
                                    <Button onClick={() => handleDelete(item)} >Delete</Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </Content>
            <ModalForm showModal={showModal} initialValues={editingUser} onSave={handleSaveUser} onCancel={() => setShowModal(false)} />
        </Layout>
    );

};
export default User;