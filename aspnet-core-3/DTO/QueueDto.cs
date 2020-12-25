using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DTO
{
    public class QueueDto
    {
        public int Id { get; set; }
        public UserDto User { get; set; }
        public int UserId { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan TimeInDay { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
