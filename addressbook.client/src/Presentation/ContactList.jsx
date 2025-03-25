import React, { useState } from 'react';

const ContactList = ({ contacts, onSelectContact, onEditContact, onDeleteContact }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5;

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;
    const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

    const totalPages = Math.ceil(contacts.length / contactsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h2>All Contacts </h2>            
            {contacts.length === 0 ? (
                <p>No contacts available.</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentContacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.firstName}</td>
                                    <td>{contact.lastName}</td>
                                    <td>
                                        <button onClick={() => onSelectContact(contact) }>View</button>
                                    </td>
                                    <td>
                                        <button onClick={() => onEditContact(contact)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => onDeleteContact(contact)}>Delete</button> {/* Call onDeleteContact when delete button is clicked */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>       
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handleClick(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ContactList;