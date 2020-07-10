using Microsoft.VisualStudio.TestTools.UnitTesting;
using Wingtiptoys.Models;
using Wingtiptoys.Repositories;

namespace Wingtiptoys.Test
{
    [TestClass]
    public class ProductRepositoryTests
    {
        [TestMethod]
        [DataRow(null, null, 16)]
        [DataRow("Cars", null, 5)]
        [DataRow("Cars", "car", 4)]
        [DataRow("Cars", "fa", 3)]
        [DataRow("Cars", "old", 2)]
        [DataRow("Cars", "wa", 1)]
        [DataRow("Cars", "zz", 0)]
        public void GetProducts(string categoryName, string searchString, int expectedCount)
        {
            var ctx = new wingtiptoysContext();
            var productRepo = new ProductRepository(ctx);
            var products = productRepo.getProducts(new ProductFilter { CategoryName = categoryName }, searchString);

            Assert.AreEqual(products.GetAwaiter().GetResult().Count, expectedCount);
        }
    }
}
