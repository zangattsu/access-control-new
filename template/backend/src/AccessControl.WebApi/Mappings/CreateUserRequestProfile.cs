using AccessControl.Application.Users.CreateUser;
using AccessControl.WebApi.Features.Users.CreateUser;
using AutoMapper;

namespace AccessControl.WebApi.Mappings;

public class CreateUserRequestProfile : Profile
{
    public CreateUserRequestProfile()
    {
        CreateMap<CreateUserRequest, CreateUserCommand>();
    }
}