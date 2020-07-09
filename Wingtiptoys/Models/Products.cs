using System;
using System.Collections.Generic;

namespace Wingtiptoys.Models
{
    public partial class Products
    {
        public Products()
        {
            CartItems = new HashSet<CartItems>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public double? UnitPrice { get; set; }
        public int? CategoryId { get; set; }

        public virtual Categories Category { get; set; }
        public virtual ICollection<CartItems> CartItems { get; set; }
    }
}
