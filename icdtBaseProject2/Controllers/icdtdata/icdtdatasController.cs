using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using icdtBaseProject2.Infrastructure;
using icdtBaseProject2.Models;
using icdtBaseProject2.Controllers.api;
using icdtBaseProject2.Models.Models;
using AutoMapper;

namespace icdtBaseProject2.Controllers
{
    public class icdtdatasController : BaseController
    {
        [HttpGet]
        [Route("api/icdtdatas")]
        public IQueryable<icdtdata> Geticdtdatas()
        {
            return db.icdtdatas;
        }

        [HttpGet]
        [Route("api/icdtdatas/{id}")]
        public IHttpActionResult Geticdtdata(int id)
        {
            icdtdata icdtdata = db.icdtdatas.Find(id);
            if (icdtdata == null)
            {
                return NotFound();
            }

            return Ok(icdtdata);
        }

        [HttpPost]
        [Route("api/icdtdatas")]
        public IHttpActionResult Posticdtdata(icdtdataDTO icdtdataDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            icdtdata theicdtdata = new icdtdata();

            Mapper.CreateMap<icdtdataDTO, icdtdata>();
            theicdtdata = Mapper.Map<icdtdataDTO, icdtdata>(icdtdataDTO);

            db.icdtdatas.Add(theicdtdata);
            db.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("api/icdtdatas/{id}")]
        public IHttpActionResult Puticdtdata(int id, icdtdataDTO icdtdataDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != icdtdataDTO.Id)
            {
                return BadRequest();
            }

            icdtdata theicdtdata = db.icdtdatas.FirstOrDefault(u => u.Id == id);

            Mapper.CreateMap<icdtdataDTO, icdtdata>();
            theicdtdata = Mapper.Map<icdtdataDTO, icdtdata>(icdtdataDTO, theicdtdata);

            // 所有欄位資料須存在
            db.SaveChanges();
            return Ok();
        }
        
        [HttpDelete]
        [Route("api/icdtdatas/{id}")]
        public IHttpActionResult Deleteicdtdata(int id)
        {
            icdtdata icdtdata = db.icdtdatas.Find(id);
            if (icdtdata == null)
            {
                return NotFound();
            }

            db.icdtdatas.Remove(icdtdata);
            db.SaveChanges();

            return Ok(icdtdata);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool icdtdataExists(int id)
        {
            return db.icdtdatas.Count(e => e.Id == id) > 0;
        }
    }
}