using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace icdtBaseProject2.Models.Tags
{
    public class TagItem
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public TagItem Parent { get; set; }        
        public ICollection<TagItem> Childrens { get; set; }
    }
}