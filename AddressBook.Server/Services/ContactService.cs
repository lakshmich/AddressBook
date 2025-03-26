using AddressBook.Server.Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AddressBook.Server.Services
{
    public interface IContactService
    {
        IEnumerable<Contact> GetContacts();
        Task<Contact> GetContactByIdAsync(string id);
        Task AddContactAsync(Contact contact);
        Task UpdateContactAsync(Contact contact);
        Task DeleteContactAsync(string id);
    }

    public class ContactService : IContactService
    {
        private static List<Contact> _contacts = new List<Contact>();

        public IEnumerable<Contact> GetContacts()
        {
            return _contacts.AsEnumerable();
        }

        public async Task<Contact> GetContactByIdAsync(string id)
        {
            return await Task.FromResult(_contacts.FirstOrDefault(c => c.id == id));
        }

        public async Task AddContactAsync(Contact contact)
        {
            ValidateContact(contact);

            _contacts.Add(contact);
            await Task.CompletedTask;
        }

        public async Task UpdateContactAsync(Contact contact)
        {
            ValidateContact(contact);

            var existingContact = await GetContactByIdAsync(contact.id);
            if (existingContact == null)
            {
                throw new KeyNotFoundException("Contact not found");
            }

            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Email = contact.Email;
            existingContact.Phone = contact.Phone;
            existingContact.Company = contact.Company;
        }

        public async Task DeleteContactAsync(string id)
        {
            var contact = await GetContactByIdAsync(id);
            if (contact != null)
            {
                await Task.Run(() => _contacts.Remove(contact));
            }
        }

        private void ValidateContact(Contact contact)
        {
            var validationResults = new List<ValidationResult>();
            var validationContext = new ValidationContext(contact);
            if (!Validator.TryValidateObject(contact, validationContext, validationResults, true))
            {
                var errorMessages = string.Join(", ", validationResults.Select(vr => vr.ErrorMessage));
                throw new ArgumentException("Invalid contact data: " + errorMessages);
            }
        }
    }
}