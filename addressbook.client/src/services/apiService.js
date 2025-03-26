import { CONTACTS_ENDPOINT, CREATE_CONTACT_ENDPOINT } from './apiConstants';

export const fetchContacts = async () => {
    const response = await fetch(CONTACTS_ENDPOINT);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
};

export const createContact = async (contact) => {    
    const response = await fetch(CONTACTS_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
        body: JSON.stringify(contact)
    });
    console.log(JSON.stringify(contact));
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
};

export const updateContact = async (contact) => {
    const response = await fetch(`${CONTACTS_ENDPOINT}/${contact.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    return response.ok;
};

export const deleteContact = async (contactId) => {
    const response = await fetch(`${CONTACTS_ENDPOINT}/${contactId}`, {
        method: 'DELETE',
    });
    return response.ok;
};
