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
        private readonly ContactService _contactService;
        private readonly ILogger<ContactController> _logger;

        public ContactController(ContactService contactService, ILogger<ContactController> logger)
        {
            _contactService = contactService;
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Contact> GetContactsList()
        {
            return _contactService.GetContactsById();
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
                return Ok(contact);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteContact(string id)
        {
            var contact = _contactService.GetContactById(id);
            if (contact == null)
            {
                return NotFound();
            }

            _contactService.DeleteContact(id);
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
