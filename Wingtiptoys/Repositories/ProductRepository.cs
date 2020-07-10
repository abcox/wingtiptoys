using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wingtiptoys.Models;

namespace Wingtiptoys.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly wingtiptoysContext _context;

        public ProductRepository(wingtiptoysContext context)
        {
            _context = context;
        }

        public async Task<List<Products>> getProducts(ProductFilter filter, string search)
        {
            IQueryable<Products> products = _context.Products;

            if (!string.IsNullOrEmpty(filter.CategoryName))
            {
                products =
                    from p in products
                    .Include(p => p.Category)
                    .Where(p => p.Category.CategoryName.Equals(filter.CategoryName))
                    select p;
            }
            if (!string.IsNullOrEmpty(search) && search.Length >= 2)
            {
                products = from p in products
                           where p.ProductName.Contains(search) || p.Description.Contains(search)
                           select p;
            }
            return await products.ToListAsync();
        }
    }
}
