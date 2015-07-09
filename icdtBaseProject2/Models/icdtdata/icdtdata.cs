using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models
{
    public class icdtdata : Entity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Email { get; set; }

        public DateTime? StartTime { get; set; }

        public DateTime? EndTime { get; set; }


    }
}