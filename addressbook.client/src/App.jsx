import './App.css';
import Header from './Presentation/Header';
import MainPage from './Presentation/MainPage';
import ContactDetails from './Presentation/ContactDetails';

function App() {

    return (
        <div className="app-container" style={{ width: '100%', height: '100%' }}>
            <Header />
            <div className="container"> 
                <div> {/* Ensure MainPage takes up available space */}  
                    <MainPage />
                </div>
                <div> {/* Ensure ContactDetails takes up available space */}
                    <ContactDetails />
                </div>
            </div>
        </div>
    );
}

export default App;