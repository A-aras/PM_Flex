
using System;
using log4net;
using System.IO;
using System.Reflection;
using System.Web.Http.ExceptionHandling;
using System.Diagnostics.CodeAnalysis;
namespace ProjectManager.API.App_Start
{
    [ExcludeFromCodeCoverage]
    public class GlobalExceptionLogger : ExceptionLogger
    {
        ILog _logger = null;
        public GlobalExceptionLogger()
        {
            var log4NetConfigDirectory = AppDomain.CurrentDomain.RelativeSearchPath ?? AppDomain.CurrentDomain.BaseDirectory;

            var log4NetConfigFilePath = Path.Combine(log4NetConfigDirectory, "log4net.config");

            log4net.Config.XmlConfigurator.ConfigureAndWatch(new FileInfo(log4NetConfigFilePath));
        }
        public override void Log(ExceptionLoggerContext context)
        {
            _logger = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            //_logger.Error(context.Exception.ToString() + Environment.NewLine);
            _logger.Error(Environment.NewLine + " Exception Time: " + System.DateTime.Now + Environment.NewLine
                + " Exception Message: " + context.Exception.Message.ToString() + Environment.NewLine
                + " Exception File Path: " + context.ExceptionContext.ControllerContext.Controller.ToString() + "/" + GetActionName(context) + Environment.NewLine);
        }
        public void Log(string ex)
        {
            _logger = log4net.LogManager.GetLogger(MethodBase.GetCurrentMethod().DeclaringType);
            _logger.Error(ex);
        }

        private string GetActionName(ExceptionLoggerContext context)
        {
            return ((System.Web.Http.Controllers.ReflectedHttpActionDescriptor)((System.Web.Http.Controllers.HttpActionDescriptor[])context.ExceptionContext.ControllerContext.RouteData.Route.DataTokens["actions"])[0]).ActionName;
        }

    }
}