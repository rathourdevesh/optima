import React, { useState } from 'react';
import { Button, Form, FloatingLabel, Modal } from 'react-bootstrap';
import axios from 'axios';

const AddSubServiceForm = ({ show, onHide, serviceId, onSuccess }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BEE_BASE_URL}/api/v1/services/sub-services`, {
                service_id: serviceId,
                name,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.status === 200) {
                alert("Sub-service added successfully!");
                onSuccess();
                onHide();
            } else {
                alert("Failed to add sub-service");
            }
        } catch (error) {
            console.error("An error occurred while adding the sub-service:", error);
            alert("An error occurred");
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Sub-Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="subServiceName" label="Sub-Service Name" className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Sub-Service Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="subServiceDescription" label="Description" className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </FloatingLabel>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddSubServiceForm;
