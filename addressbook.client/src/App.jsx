import { useEffect, useState } from 'react';
import './App.css';
import Header from './Presentation/Header';
import MainPage from './Presentation/MainPage';
import ContactDetails from './Presentation/ContactDetails';

function App() {
    const [contacts, setContacts] = useState([]);
    const [showContactList, setShowContactList] = useState(false);

    useEffect(() => {
        if (showContactList) {
            fetchContacts();
        }
    }, [showContactList]);

    const fetchContacts = async () => {
        try {
            const response = await fetch('https://localhost:7177/api/contact');
            if (response.ok) {
                const data = await response.json();
                setContacts(data);
            } else {
                console.error('Failed to fetch contacts');
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const handleSave = async (contact) => {
        try {
            const response = await fetch('https://localhost:7177/api/Contact', {
                method: 'POST',
                headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
            console.log(JSON.stringify(contact));
            if (response.ok) {
                const newContact = await response.json();
                setContacts([...contacts, newContact]);
            } else {
                console.error('Failed to add contact');
            }
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleShowContacts = () => {
        setShowContactList(true);
    };

    return (
        <div className="app-container" style={{ width: '100%', height: '100%' }}>
            <Header />
            <div className="container"> 
                <div> {/* Ensure MainPage takes up available space */}  
                    <MainPage
                        contacts={contacts} // passing a prop
                        handleSave={handleSave} // passing a func to save a form
                        handleShowContacts={handleShowContacts} // passing a func
                        showContactList={showContactList} // passing a prop
                    />
                </div>
                <div> {/* Ensure ContactDetails takes up available space */}
                    <ContactDetails />
                </div>
            </div>
        </div>
    );
}

export default App;