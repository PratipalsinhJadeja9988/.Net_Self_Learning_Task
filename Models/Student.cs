using System.ComponentModel.DataAnnotations;

namespace CourseDesk.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Full name is required.")]
        [StringLength(60, MinimumLength = 3, ErrorMessage = "Full name must be 3 to 60 characters.")]
        [Display(Name = "Full name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Enter a valid email address.")]
        [Display(Name = "Email address")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Course is required.")]
        [StringLength(40, ErrorMessage = "Course can be at most 40 characters.")]
        public string Course { get; set; }

        [Required(ErrorMessage = "Semester is required.")]
        [Range(1, 8, ErrorMessage = "Semester must be between 1 and 8.")]
        public int? Semester { get; set; }
    }
}
