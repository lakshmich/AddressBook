import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

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
        <form onSubmit={handleSubmit} className="contact-form flex justify-center items-center h-full"> {/* Center the form */}
            <div className="mb-4">
                <label className="block font-semibold">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1"
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1"
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Phone Number:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Email Address:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1"
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Company:</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mt-1"
                />
            </div>

            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    onClick={handleCancel}
                    className="w-1/2 bg-gray-500 text-white p-3 rounded mr-2"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="w-1/2 bg-blue-500 text-white p-3 rounded ml-2"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default ContactForm;

