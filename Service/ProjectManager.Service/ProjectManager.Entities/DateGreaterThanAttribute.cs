using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManager.Entities
{
    public class DateGreaterThanAttribute : ValidationAttribute
    {
        public string FromDateField;
        protected DateGreaterThanAttribute(string FromDateField, string errorMessage) : base(errorMessage)
        {
            this.FromDateField = FromDateField;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            return base.IsValid(value, validationContext);
        }
    }
}
