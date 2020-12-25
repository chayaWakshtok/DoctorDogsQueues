using AutoMapper;
using DAL;
using DTO;
using System.Collections.Generic;

namespace BL.Helpers
{
    public class AutoMapperConvert 
    {
        private static AutoMapper.MapperConfiguration _conffiguration = new AutoMapper.MapperConfiguration(cfg =>
        {
            cfg.CreateMap<User, UserDto>();
            cfg.CreateMap<UserDto, User>();
            cfg.CreateMap<Queue, QueueDto>();
            cfg.CreateMap<QueueDto, Queue>();
        });

        private static IMapper _mapper = _conffiguration.CreateMapper();

        public static UserDto Convert(User dal)
        {
            return _mapper.Map<UserDto>(dal);
        }

        public static User Convert(UserDto dto)
        {
            return _mapper.Map<User>(dto);
        }

        public static List< UserDto> Convert(List<User> dal)
        {
            return _mapper.Map< List<UserDto>>(dal);
        }

        public static List<User> Convert(List<UserDto> dto)
        {
            return _mapper.Map< List<User>>(dto);
        }

        public static Queue Convert(QueueDto dto)
        {
            return _mapper.Map<Queue>(dto);
        }

        public static QueueDto Convert(Queue dal)
        {
            return _mapper.Map<QueueDto>(dal);
        }

        public static List<Queue> Convert(List<QueueDto> dto)
        {
            return _mapper.Map< List<Queue>>(dto);
        }

        public static List<QueueDto> Convert(List<Queue> dal)
        {
            var map= _mapper.Map< List<QueueDto>>(dal);
            map.ForEach(m =>
            {
                var result = dal.Find(p=>p.Id==m.Id);
                m.User = _mapper.Map<UserDto>(result.User);
            });
            return map;
        }

    }
}