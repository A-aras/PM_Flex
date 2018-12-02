using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManager.Entities
{
    public interface IDeepCopy<T> where T : class
    {
        T DeepCopy();
    }
}
