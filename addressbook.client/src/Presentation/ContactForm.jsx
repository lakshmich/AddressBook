import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import styled from 'styled-components';
import Input from '../ui/input'; // Correct the import statement
import DialogFooter from '../ui/Dialog';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  flex: 1;
  text-align: left;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const ContactForm = ({ onSave, contact }) => {
    const [formData, setFormData] = useState({
        id: "", // Add id field
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        company: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contact) {
            setFormData(contact);
        }
    }, [contact]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
        if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required.";
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number format.";
        if (!formData.email.trim() && (!/\S+@\S+\.\S+/.test(formData.email))) newErrors.email = "Invalid email format.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            let contactWithId = formData;
            if (!formData.id) {
                // Generate a unique ID for the new contact
                contactWithId = { ...formData, id: uuidv4() };
            }
            onSave(contactWithId);
        }
    };

    const handleCancel = () => {
        setFormData({
            id: "", // Reset id field
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            company: "",
        });
        setErrors({});
    };

    return (
        <FormContainer>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label>First Name</Label>
                            <Input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
                        </div>
                        <div className="space-y-2">
                            <Label>Last Name</Label>
                            <Input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} />
                            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
                        </div>
                        <div className="space-y-2">
                            <Label>Company</Label>
                            <Input type="text" name="company" value={formData.company || ''} onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="space-y-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-primary hover:bg-primary/90"
                    >
                        Save
                    </button>
                </DialogFooter>
            </form>
        </FormContainer>
    );
};

export default ContactForm;

