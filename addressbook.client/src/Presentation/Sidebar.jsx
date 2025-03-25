import React from 'react';

const Sidebar = ({ onAddContact }) => {
    return (        
        <div>
            <img src="\public\Avatar.png" alt="User" className="user-image" />
            <div className="w-full gap-2" > {/* Add margin-top to position the button below the avatar */}
                <button
                    type="button"
                    onClick={onAddContact}
                    className="w-full p-3 rounded" /* Remove specific bg and text color classes */
                >
                    Add a Contact
                </button>
            </div>
        </div>
    );
};

export default Sidebar;