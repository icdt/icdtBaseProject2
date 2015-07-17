using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models
{
    public class icdtdata : Entity
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }

        public bool? IsChecked { get; set; }

        public string Radio { get; set; }

        public Double? Number { get; set; }

        public string Select { get; set; }

        public string AutoComplete { get; set; }

        public string Checklist { get; set; }

        public string Photo { get; set; }

        public string CKeditorContent { get; set; }

        public bool? IsDeleted { get; set; }

    }
}