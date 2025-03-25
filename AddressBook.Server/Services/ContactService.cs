using AddressBook.Server.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace AddressBook.Server.Services
{

    public class ContactService
    {
        private readonly List<Contact> _contacts = new List<Contact>();
        public ContactService() { }

        // Get contact by id
        // GET /api/contacts/{id}
        public IEnumerable<Contact> GetContactsById()
        {
            // we can connect to DB to get all contacts for given Id
            return _contacts.AsEnumerable();
        }

        public Contact GetContactById(string id)
        {
            return _contacts.FirstOrDefault(c => c.id == id);
        }

        // ...existing code...
        public async Task AddContactAsync(Contact contact)
        {
            // Validate contact
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(contact);
            if (!Validator.TryValidateObject(contact, validationContext, validationResults, true))
            {
                var errorMessages = string.Join(", ", validationResults.Select(vr => vr.ErrorMessage));
                throw new ArgumentException("Invalid contact data: " + errorMessages);
            }

            // Generate a unique ID
            //contact.id = Guid.NewGuid().ToString();

            // Simulate async database operation
            await Task.Run(() => _contacts.Add(contact));
        }

        // Update a contact
        // PUT /api/contacts/{id}
        public async Task UpdateContactAsync(Contact contact)
        {
            // Validate contact
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(contact);
            if (!Validator.TryValidateObject(contact, validationContext, validationResults, true))
            {
                var errorMessages = string.Join(", ", validationResults.Select(vr => vr.ErrorMessage));
                throw new ArgumentException("Invalid contact data: " + errorMessages);
            }

            var existingContact = GetContactById(contact.id);
            if (existingContact == null)
            {
                throw new KeyNotFoundException("Contact not found");
            }

            // Update contact details
            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.Phone = contact.Phone;
            existingContact.Company = contact.Company;

            // Simulate async database operation
            await Task.Run(() => { /* Simulate update operation */ });
        }

        // Delete a contact
        // DELETE /api/contacts/{id}
        public void DeleteContact(string id)
        {
            var contact = GetContactById(id);
            if (contact != null)
            {
                _contacts.Remove(contact);
            }
        }
    }
}