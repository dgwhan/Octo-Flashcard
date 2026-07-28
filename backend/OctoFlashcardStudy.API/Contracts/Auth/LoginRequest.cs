using System.ComponentModel.DataAnnotations;

namespace OctoFlashcardStudy.API.Contracts.Auth
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Email or username is required")]
        [StringLength(100)]
        public string Identifier { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100)]
        public string Password { get; set; } = string.Empty;

        public bool RememberMe { get; set; }
    }
}
