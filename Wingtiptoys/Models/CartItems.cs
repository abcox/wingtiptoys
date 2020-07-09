using System;
using System.Collections.Generic;

namespace Wingtiptoys.Models
{
    public partial class CartItems
    {
        public string ItemId { get; set; }
        public string CartId { get; set; }
        public int Quantity { get; set; }
        public DateTime DateCreated { get; set; }
        public int ProductId { get; set; }

        public virtual Products Product { get; set; }
    }
}
