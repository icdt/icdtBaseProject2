using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models
{
    public class Order
    {
        public Guid id { get; set; }

        public string OrderId { get; set; }

        public DateTime OrderDate { get; set; }
    }
}