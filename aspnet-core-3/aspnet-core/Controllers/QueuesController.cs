using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BL;
using BL.Helpers;
using DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class QueuesController : ControllerBase
    {
        private IQueueService _queueService;

        public QueuesController(
            IQueueService queueService)
        {
            _queueService = queueService;
        }

        // GET: api/Queues
        [HttpGet]
        public IActionResult Get()
        {
            var queues = _queueService.GetAll();
            return Ok(queues);
        }

        // GET api/Queues/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var queue = _queueService.GetById(id);
            return Ok(queue);
        }

        // POST api/Queues
        [HttpPost]
        public IActionResult Post([FromBody] QueueDto value)
        {
            try
            {
                _queueService.Create(value);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT api/Queues/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] QueueDto queueDto)
        {
            try
            {
                _queueService.Update(queueDto);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE api/Queues/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _queueService.Delete(id);
            return Ok();
        }
    }
}
