namespace AccessControl.Common.Security
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(IUser user);
    }
}
