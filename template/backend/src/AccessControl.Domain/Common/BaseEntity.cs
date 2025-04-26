using AccessControl.Common.Validation;

namespace AccessControl.Domain.Common;

public class BaseEntity<T> : IEntity<T>, IComparable<BaseEntity<T>> // Updated to specify the generic type argument
{
    public T Id { get; }

    public Task<IEnumerable<ValidationErrorDetail>> ValidateAsync()
    {
        return Validator.ValidateAsync(this);
    }

    public int CompareTo(BaseEntity<T>? other) // Updated to specify the generic type argument
    {
        if (other == null)
        {
            return 1;
        }

        if (Id is IComparable comparableId && other.Id is IComparable comparableOtherId)
        {
            return comparableId.CompareTo(comparableOtherId);
        }

        throw new InvalidOperationException("Id does not implement IComparable.");
    }
}
