import React, { FC, useEffect, useState } from "react";
import { Department,getAllDepartments, deleteDepartment,createDepartment, updateDepartment } from "entities/Department";
import { DepartmentCard } from "../DepartmentCard/DepartmentCard";
import { Modal, Button, Form } from "react-bootstrap";
import "./DepartmentList.scss";

const DepartmentList: FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newDepartment, setNewDepartment] = useState<Partial<Department>>({
        name: "",
        description: "",
        specialty: "",
        specialization: ""
    });
    const [validated, setValidated] = useState(false);

    useEffect(()=>{
        getAllDepartments()
            .then((res)=> setDepartments(res))
            .catch(err=>console.log(err));
    },[]);

    const handleDelete = (id: number) => {
        deleteDepartment(id)
            .then(() => {
                console.log(`Видалення відділу з ID: ${id}`);
                setDepartments(prevState => prevState.filter((department)=> department.id !== id));
            })
            .catch((error) => {
                console.error(`Помилка при видаленні відділу з ID: ${id}`, error);
            });
    };

    const handleEdit = (id: number, data: Department) => {
        updateDepartment(id, data)
            .then(() => {
                console.log(`Edit відділу з ID: ${id}`);
                setDepartments((prevDepartments) =>
                    prevDepartments.map((department) => {
                        if (department.id === id) {
                            return data;
                        }
                        return department;
                    })
                );
            })
            .catch((error) => {
                console.error(`Помилка при Edit відділу з ID: ${id}`, error);
            });
    };

    const handleSave = () => {
        const form = document.getElementById("addDepartmentForm") as HTMLFormElement;

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        // @ts-ignore
        createDepartment(newDepartment)
            .then(() => {
               // @ts-ignore
                setDepartments(prevState => [...prevState, newDepartment]);
            })
            .then(() => {
                setShowModal(false);
                setNewDepartment({
                    name: "",
                    description: "",
                    specialty: "",
                    specialization: ""
                });
                setValidated(false);
            })
            .catch(err => console.log(err));
    };

    const handleAdd = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setValidated(false);
    };

    return (
        <div className="departments__list">
            <Button variant="primary" onClick={handleAdd}>Додати кафедру</Button>
            {departments && departments.map((department: Department, index: React.Key | null | undefined) => (
                <DepartmentCard department={department} key={index} onEdit={handleEdit} onDelete={handleDelete} />
            ))}

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Додати нову кафедру</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addDepartmentForm" noValidate validated={validated}>
                        <Form.Group controlId="formDepartmentName">
                            <Form.Label>Назва</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Введіть назву кафедри"
                                value={newDepartment.name || ""}
                                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Будь ласка, введіть назву
                                кафедри.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDepartmentDescription">
                            <Form.Label>Опис</Form.Label>
                            <Form.Control
                                required
                                as="textarea"
                                placeholder="Введіть опис кафедри"
                                value={newDepartment.description || ""}
                                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Будь ласка, введіть опис
                                кафедри.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDepartmentSpecialty">
                            <Form.Label>Спеціальність</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Введіть спеціальність кафедри"
                                value={newDepartment.specialty || ""}
                                onChange={(e) => setNewDepartment({ ...newDepartment, specialty: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Будь ласка, введіть спеціальність
                                кафедри.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formDepartmentSpecialization">
                            <Form.Label>Спеціалізація</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Введіть спеціалізацію кафедри"
                                value={newDepartment.specialization || ""}
                                onChange={(e) => setNewDepartment({ ...newDepartment, specialization: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Будь ласка, введіть спеціалізацію
                                кафедри.</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Закрити</Button>
                    <Button variant="primary" onClick={handleSave}>Зберегти</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export { DepartmentList };
