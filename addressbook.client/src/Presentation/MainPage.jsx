import React from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import Sidebar from './Sidebar';
import { useContacts } from '../hooks/useContacts';

const MainPage = () => {
    const {
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
    } = useContacts();

    return (
        <div className="container flex" style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <div className="w-[15%] min-w-[200px] h-full flex-shrink-0">
                <Sidebar onAddContact={handleAddContact} />
            </div>
            <div className="flex-1 flex">
                {showContactForm ? (
                    <div className="w-1/2 p-2">
                        <ContactForm onSave={handleSaveContact} contact={selectedContact} />
                    </div>
                ) : (
                    showContactList && (
                        <div className="flex w-full">
                            <div className="w-1/2 p-2">
                                <ContactList
                                    contacts={contacts}
                                    onSelectContact={handleSelectContact}
                                    onEditContact={handleEditContact}
                                    onDeleteContact={handleDeleteContact}
                                />
                            </div>
                            <div className="w-1/2 p-2">
                                <ContactDetails contact={selectedContact} mode={showContactDetailState} />
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default MainPage;
