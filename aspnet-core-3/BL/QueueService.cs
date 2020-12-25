using BL.Helpers;
using DAL;
using DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BL
{
    public interface IQueueService
    {
        List<QueueDto> GetAll();
        QueueDto GetById(int id);
        QueueDto Create(QueueDto queueDto);
        void Update(QueueDto queueDto);
        void Delete(int id);
    }

    public class QueueService : IQueueService
    {
        private DataContext _context;

        public QueueService(DataContext context)
        {
            _context = context;
        }

        public QueueDto Create(QueueDto queueDto)
        {
            var queue = AutoMapperConvert.Convert(queueDto);
            queue.User = _context.Users.Find(queueDto.UserId);
            // validation
            if (DateTime.MinValue == queue.Date)
                throw new AppException("Date & Time is required");

            if (_context.Queues.Any(x => x.Date == queue.Date && x.TimeInDay == queue.TimeInDay))
                throw new AppException("Have queue in this date & Time: " + queue.Date.ToShortDateString() + " " + queue.TimeInDay);

            queue.CreatedDate = DateTime.Now;
            _context.Queues.Add(queue);
            _context.SaveChanges();

            return queueDto;
        }

        public void Delete(int id)
        {
            var queue = _context.Queues.Find(id);
            if (queue != null)
            {
                _context.Queues.Remove(queue);
                _context.SaveChanges();
            }
        }

        public List<QueueDto> GetAll()
        {
            var queuesDto = AutoMapperConvert.Convert(_context.Queues.
                Where(p=>p.Date.AddHours(p.TimeInDay.Hours)>=DateTime.Now).
                OrderBy(p => p.Date).ThenBy(pp => pp.TimeInDay)
                .ToList());
            return queuesDto;
        }

        public QueueDto GetById(int id)
        {
            //use store
            var baseItem = _context.Queues.FromSqlRaw("Execute dbo.findQueue @id = {0} ", id).FirstOrDefault();
            var queuesDto = AutoMapperConvert.Convert(baseItem);
            return queuesDto;
        }

        public void Update(QueueDto queueDto)
        {
            var queue = _context.Queues.Find(queueDto.Id);

            if (queue == null)
                throw new AppException("Queue not found");

            // update  if it has changed
            if (queue.Date != queueDto.Date || queue.TimeInDay != queueDto.TimeInDay)
            {
                if (_context.Queues.Any(x => x.Date == queueDto.Date && x.TimeInDay == queueDto.TimeInDay))
                    throw new AppException("Have queue in this" + queue.Date + " " + queue.TimeInDay);

                queue.Date = queueDto.Date;
                queue.TimeInDay = queueDto.TimeInDay;
            }
            queue.CreatedDate = DateTime.Now;
            _context.Queues.Update(queue);
            _context.SaveChanges();
        }
    }
}
