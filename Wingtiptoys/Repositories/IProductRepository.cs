using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wingtiptoys.Models;

namespace Wingtiptoys.Repositories
{
    public interface IProductRepository
    {
        Task<List<Products>> getProducts(ProductFilter filter, string search);
    }
}
