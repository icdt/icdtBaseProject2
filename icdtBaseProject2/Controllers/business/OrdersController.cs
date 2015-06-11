using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using icdtBaseProject2.Infrastructure;
using icdtBaseProject2.Models;

namespace icdtBaseProject2.Controllers.api
{
    [Authorize(Roles = "Orders")]
    public class OrderController : BaseController
    {
     
        // GET: api/Orders
        public IQueryable<Order> GetOrders()
        {
            return DB.Orders;
        }

        // GET: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult GetOrder(Guid id)
        {
            Order order = DB.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // PUT: api/Orders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOrder(Guid id, Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != order.id)
            {
                return BadRequest();
            }

            DB.Entry(order).State = EntityState.Modified;

            try
            {
                DB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Orders
        [ResponseType(typeof(Order))]
        public IHttpActionResult PostOrder(Order order)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DB.Orders.Add(order);

            try
            {
                DB.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (OrderExists(order.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = order.id }, order);
        }

        // DELETE: api/Orders/5
        [ResponseType(typeof(Order))]
        public IHttpActionResult DeleteOrder(Guid id)
        {
            Order order = DB.Orders.Find(id);
            if (order == null)
            {
                return NotFound();
            }

            DB.Orders.Remove(order);
            DB.SaveChanges();

            return Ok(order);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                DB.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderExists(Guid id)
        {
            return DB.Orders.Count(e => e.id == id) > 0;
        }
    }
}