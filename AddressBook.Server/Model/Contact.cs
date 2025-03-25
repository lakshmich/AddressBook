using System;
using System.ComponentModel.DataAnnotations;

namespace AddressBook.Server.Model
{
    public class Contact
    {
        public string id { get; set; }

        [Required(ErrorMessage  = "Name is required")]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Incorrect format")]
        [Required]
        public string Phone { get; set; }
        public string? Company { get; set; }
    }
}