using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL
{
    public class Queue
    {
        [Key]
        public int Id { get; set; }
        public User User { get; set; }

        [Required]
        public DateTime Date { get; set; }
        public TimeSpan TimeInDay { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
