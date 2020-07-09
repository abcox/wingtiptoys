using System;
using System.Collections.Generic;

namespace Wingtiptoys.Models
{
    public partial class OrderDetails
    {
        public int OrderDetailId { get; set; }
        public int OrderId { get; set; }
        public string Username { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public double? UnitPrice { get; set; }

        public virtual Orders Order { get; set; }
    }
}
