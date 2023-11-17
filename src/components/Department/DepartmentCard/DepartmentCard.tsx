import React, { FC, useState } from "react";
import { Department } from "entities/Department";
import { Card, Button, Modal, Form } from "react-bootstrap";
import "./DepartmentCard.scss";

interface DepartmentCardProps {
    department: Department;
    onDelete: (id: number) => void;
    onEdit: (id: number, data: Department) => void;
}

const DepartmentCard: FC<DepartmentCardProps> = ({ department, onDelete, onEdit }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedDepartment, setEditedDepartment] = useState({ ...department });

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedDepartment({ ...editedDepartment, [name]: value });
    };

    const confirmDelete = () => {
        onDelete(department.id);
        setShowDeleteModal(false);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
    };

    const saveChanges = () => {
        onEdit(department.id,editedDepartment);
        setShowEditModal(false);
    };

    return (
        <Card className="department">
            <Card.Body>
                <Card.Title className="department__name">{department.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted department__specialty">{department.specialty}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted department__specialization">{department.specialization}</Card.Subtitle>

                <div className="department__btn-group">
                    <Button variant="primary" className="department__btn department__btn_edit" onClick={handleEditClick}>
                        Редагувати
                    </Button>

                    <Button
                        variant="danger"
                        className="department__btn department__btn_delete"
                        onClick={handleDeleteClick}
                    >
                        Видалити
                    </Button>
                </div>
            </Card.Body>

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редагування кафедри</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formDepartmentName">
                            <Form.Label>Назва</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                name="name"
                                defaultValue={editedDepartment.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartmentDescription">
                            <Form.Label>Опис</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                name="description"
                                value={editedDepartment.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartmentSpecialty">
                            <Form.Label>Спеціальність</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                name="specialty"
                                value={editedDepartment.specialty}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDepartmentSpecialization">
                            <Form.Label>Спеціалізація</Form.Label>
                            <Form.Control
                                className="mb-3"
                                type="text"
                                name="specialization"
                                value={editedDepartment.specialization}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Скасувати
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Зберегти зміни
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={cancelDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Підтвердження видалення</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ви впевнені, що хочете видалити цю кафедру ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Скасувати
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Видалити
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export { DepartmentCard };
