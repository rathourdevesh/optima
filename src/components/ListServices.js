import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { getServicesData } from '../services/fetchServicesApi';
import { userRole } from '../utils/constants';
import AddServiceForm from './AddServiceForm';
import AddSubServiceForm from './AddSubServiceForm';

const ListServices = () => {
    const [servicesData, setServicesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [showAddSubServiceForm, setShowAddSubServiceForm] = useState(false);
    const [currentServiceId, setCurrentServiceId] = useState(null);
    const userInfo = useSelector((state) => state.user.userInfo);

    const fetchData = async () => {
        try {
            const data = await getServicesData();
            setServicesData(data);
        } catch (error) {
            console.error('Error fetching services data', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddServiceSuccess = () => {
        // Refresh the service data to include the newly added service
        fetchData();
    };

    const handleAddSubServiceSuccess = () => {
        // Refresh the service data to include the newly added sub-service
        fetchData();
    };

    if (loading) {
        return <p>Loading services...</p>;
    }

    return (
        <div style={{ paddingTop: '10rem', paddingBottom: '10rem' }} data-bs-theme="dark">
            <Container>
                {/* Add Service Button for Admin Users */}
                {userInfo && userInfo.userRole === userRole.ADMIN && (
                    <>
                        <Button onClick={() => setShowAddServiceForm(true)} className="mb-4">
                            Add Service
                        </Button>
                        <AddServiceForm
                            show={showAddServiceForm}
                            onHide={() => setShowAddServiceForm(false)}
                            onSuccess={handleAddServiceSuccess}
                            className="login"
                        />
                    </>
                )}

                <Accordion defaultActiveKey="0" className="accordion-item">
                    {servicesData && typeof servicesData === 'object' && !Array.isArray(servicesData)
                    && servicesData.map((service, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header className="accordion-item">
                                {service.name}

                                {/* Add SubService Button for Admin Users */}
                                {userInfo && userInfo.userRole === userRole.ADMIN && (
                                    <Button
                                        onClick={() => {
                                            setCurrentServiceId(service.id);
                                            setShowAddSubServiceForm(true);
                                        }}
                                        variant="outline-secondary"
                                        size="sm"
                                        className="ms-2"
                                    >
                                        Add Sub-Service
                                    </Button>
                                )}
                            </Accordion.Header>
                            <Accordion.Body className="accordion-item">
                                <Accordion className="accordion-item">
                                    {service.subServices.map((subService, subIndex) => (
                                        <Accordion.Item eventKey={`${index}-${subIndex}`} key={subIndex}>
                                            <Accordion.Header className="accordion-item">{subService.name}</Accordion.Header>
                                            <Accordion.Body className="accordion-item">
                                                {subService.description}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>

                <AddSubServiceForm
                    show={showAddSubServiceForm}
                    onHide={() => setShowAddSubServiceForm(false)}
                    serviceId={currentServiceId}
                    onSuccess={handleAddSubServiceSuccess}
                />
            </Container>
        </div>
    );
};

export default ListServices;
