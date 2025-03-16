using AccessControl.Domain.Entities;
using AccessControl.Domain.Enums;

namespace AccessControl.Domain.Specifications;

public class ActiveUserSpecification : ISpecification<User>
{
    public bool IsSatisfiedBy(User user)
    {
        return user.Status == UserStatus.Active;
    }
}
