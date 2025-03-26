import React from 'react';

const ContactDetails = ({ contact }) => {
    if (!contact) {
        return <p></p>
    }

    return (
        <div className="contact-details">
            <h2>Contact Details</h2>
            <p><strong>First Name:</strong> {contact.firstName}</p>
            <p><strong>Last Name:</strong> {contact.lastName}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
        </div>
    );
};

export default ContactDetails;