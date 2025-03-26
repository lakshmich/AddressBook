using AddressBook.Server.Model;
using AddressBook.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AddressBook.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IContactService contactService, ILogger<ContactController> logger)
        {
            _contactService = contactService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetContactsList()
        {
            var contacts = _contactService.GetContacts();
            return Ok(contacts);
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _contactService.AddContactAsync(contact);
                var createdContact = await _contactService.GetContactByIdAsync(contact.id);
                return Ok(createdContact);                
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(string id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            await _contactService.DeleteContactAsync(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(string id, Contact contact)
        {
            if (id != contact.id)
            {
                return BadRequest("Contact ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _contactService.UpdateContactAsync(contact);
                return Ok(contact);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
