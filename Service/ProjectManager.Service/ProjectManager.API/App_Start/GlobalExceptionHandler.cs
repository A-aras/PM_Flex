using System.Net.Http;
using System.Threading;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Results;
using System.Diagnostics.CodeAnalysis;
namespace ProjectManager.API.App_Start
{
    [ExcludeFromCodeCoverage]
    public class GlobalExceptionHandler : ExceptionHandler

    {
        public override void Handle(ExceptionHandlerContext context)
        {
            context = SetErrorContent(context);
            base.Handle(context);
        }

        public override System.Threading.Tasks.Task HandleAsync(ExceptionHandlerContext context, CancellationToken cancellationToken)
        {
            context = SetErrorContent(context);
            return base.HandleAsync(context, cancellationToken);
        }

        private ExceptionHandlerContext SetErrorContent(ExceptionHandlerContext context)
        {
            if (context.Exception is System.Data.SqlClient.SqlException)
            {
                var result = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Contact Administartor SQL Error"),

                };
                context.Result = new ResponseMessageResult(result);
            }
            else
            {
                var result = new HttpResponseMessage(System.Net.HttpStatusCode.BadRequest)
                {
                    Content = new StringContent(context.Exception.Message),

                };
                context.Result = new ResponseMessageResult(result);
            }
            return context;
        }
    }
}