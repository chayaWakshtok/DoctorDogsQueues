using System.ComponentModel.DataAnnotations;

namespace DAL
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [MaxLength(20)]
        [Required]
        public string FirstName { get; set; }

        [MaxLength(20)]
        [Required]
        public string LastName { get; set; }

        [MaxLength(20)]
        [Required]
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}