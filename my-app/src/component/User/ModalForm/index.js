import React, { useEffect, useState } from 'react';
import './style.css';
import {
    Modal,
    Form,
    Input,
    Select,
} from 'antd';

function ModalForm({ showModal, initialValues, onSave, onCancel }) {
    const [form] = Form.useForm();
    // const [isFormReset, setIsFormReset] = useState(false);
    // useEffect(() => {
    //     if (!isFormReset) {
    //         form.resetFields();
    //         setIsFormReset(true);
    //     }
    // }, [isFormReset]);
    useEffect(() => {
        if (initialValues) {
            form.resetFields();
            form.setFieldsValue(initialValues);
            // setIsFormReset(true);
        }
        // else {
        //     form.resetFields();
        //     setIsFormReset(false);
        // }
        return form.resetFields();
    }, [form, initialValues]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                form.resetFields();
                onSave(values);
            })
            .catch((error) => {
                console.log(' error:', error);
            });
    };
    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal
            open={showModal} title={initialValues ? 'Edit User' : 'Add User'}
            okText={initialValues ? 'Edit ' : 'Add'}
            cancelText="Cancel"
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form
                initialValues={initialValues}
                form={form}
                labelAlign="left"
                wrapperCol={{ flex: 5 }}
                labelCol={{ span: 4 }}
                layout="horizontal">
                <Form.Item rules={[{
                    required: true,
                    message: 'Please enter fullname'
                },
                { whitespace: true },
                { min: 4 },
                ]} name='fullname' label="Full Name">
                    <Input className='input-form' />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please enter User Name'
                },
                { whitespace: true },
                { min: 4 },
                ]} name='username' label="UserName">
                    <Input className='input-form' />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please select Gender'
                }]} name='gender' label="Gender">
                    <Select className='input-form'>
                        <Select.Option value='Male'>Male</Select.Option>
                        <Select.Option value='FeMale'>FeMale</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please enter Address'
                },
                { whitespace: true },
                { min: 4 },]} name='address' label="Address">
                    <Input className='input-form' />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please enter gmail'
                },
                { type: 'email' }]}
                    name='gmail' label="Gmail">
                    <Input className='input-form' />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please enter phone'
                },
                { whitespace: true },
                { max: 11 }]}
                    name='phone' label="Phone">
                    <Input className='input-form' type='number' />
                </Form.Item>
            </Form>
        </Modal>
    );

};
export default ModalForm;