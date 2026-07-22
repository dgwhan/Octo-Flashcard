using System.ComponentModel.DataAnnotations;

namespace OctoFlashcardStudy.API.Contracts.Auth
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required")]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage ="Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength (50, MinimumLength = 8)]
        public string Password { get; set; } = string.Empty;
    }
}
