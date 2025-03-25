import React, { useEffect, useState } from 'react';  
import ContactForm from './ContactForm';  
import ContactList from './ContactList';  
import ContactDetails from './ContactDetails';  
import Sidebar from './Sidebar';  
import fetchContacts from '../app'; // Import fetchContacts from app.jsx  

const MainPage = ({ contacts, handleSave, handleShowContacts, showContactList }) => {  
   const [selectedContact, setSelectedContact] = useState(null);  
   const [showContactForm, setShowContactForm] = useState(false);  
   const [showContactDetailState, setContactDetails] = useState(null);  

   useEffect(() => {  
       if (!showContactForm) {  
           console.error('Failed to show contacts');  
           handleShowContacts(true);  
       }  
   }, [showContactForm]);  

   const handleSelectContact = (contact) => {  
       setSelectedContact(contact);  
       showContactDetailState("View");  
   };  

   const handleEditContact = async (contact) => {  
       setSelectedContact(contact);  
       setShowContactForm(true);  
       setContactDetails("Edit");  
   };  

   const handleAddContact = () => {  
       setSelectedContact(null); // Clear selected contact
       setShowContactForm(true);  
   };  

   const handlePostContact = async (contact) => {
       await handleSave(contact);
       setShowContactForm(false);
   };  

   const handleSaveContact = async (contact) => {
       if (contact.id) {
           try {  
               const response = await fetch(`https://localhost:7177/api/contact/${contact.id}`, {  
                   method: 'PUT',  
                   headers: {  
                       'Content-Type': 'application/json',  
                   },  
                   body: JSON.stringify(contact),  
               });  
               if (response.ok) {  
                   await fetchContacts(); // Call fetchContacts to refresh the contact list
                   handleShowContacts(true); // Ensure the contact list is shown
                   setShowContactForm(false); // Hide the contact form
               } else {  
                   console.error('Failed to update contact');  
               }  
           } catch (error) {  
               console.error('Error updating contact:', error);  
           }  
       } else {
           handlePostContact(contact);
       }
   };  

   const handleDeleteContact = async (contact) => {  
       try {  
           const response = await fetch(`https://localhost:7177/api/contact/${contact.id}`, {  
               method: 'DELETE',  
           });  
           if (response.ok) {  
               await fetchContacts(); // Call fetchContacts to refresh the contact list
               handleShowContacts(true); // Ensure the contact list is shown
           } else {  
               console.error('Failed to delete contact');  
           }  
       } catch (error) {  
           console.error('Error deleting contact:', error);  
       }  
   };  

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
