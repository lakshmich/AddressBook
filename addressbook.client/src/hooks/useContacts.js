import { useState, useEffect } from 'react';
import { createContact, fetchContacts, updateContact, deleteContact } from '../services/apiService';

export const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showContactDetailState, setContactDetails] = useState(null);
    const [showContactList, setShowContactList] = useState(false);

    useEffect(() => {
        if (!showContactForm) {
            fetchContacts().then(setContacts);
            setShowContactList(true);
        }
    }, [showContactForm, showContactList]);

    const handleSelectContact = (contact) => {
        setSelectedContact(contact);
        setContactDetails("View");
    };

    const handleEditContact = (contact) => {
        setSelectedContact(contact);
        setShowContactForm(true);
        setContactDetails("Edit");
    };

    const handleAddContact = () => {
        setSelectedContact(null);
        setShowContactForm(true);
    };

    const handleSaveContact = async (contact) => {
        if (contact.id && showContactDetailState === "Edit") {
            try {
                const success = await updateContact(contact);
                if (success) {
                    const updatedContacts = await fetchContacts();
                    setContacts(updatedContacts);
                    setShowContactList(true);
                    setShowContactForm(false);
                } else {
                    console.error('Failed to update contact');
                }
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        } else {
            try {
                const newContact = await createContact(contact);
                if (newContact) {
                    setContacts([...contacts, newContact]);
                    setShowContactForm(false);
                } else {
                    console.error('Failed to create contact');
                }
            } catch (error) {
                console.error('Error creating contact:', error);
            }
        }
    };

    const handleDeleteContact = async (contact) => {
        try {
            const success = await deleteContact(contact.id);
            if (success) {
                const updatedContacts = await fetchContacts();
                setContacts(updatedContacts);
                setShowContactList(true);
            } else {
                console.error('Failed to delete contact');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return {
        contacts,
        selectedContact,
        showContactForm,
        showContactDetailState,
        showContactList,
        handleSelectContact,
        handleEditContact,
        handleAddContact,
        handleSaveContact,
        handleDeleteContact,
    };
};