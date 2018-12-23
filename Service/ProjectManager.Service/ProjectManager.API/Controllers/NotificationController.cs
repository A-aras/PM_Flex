using Newtonsoft.Json;
using ProjectManager.Api.Models;
using System;
using System.Collections.Concurrent;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ProjectManager.Api.Controllers
{
    [EnableCors("*", "*", "*")]
    public class NotificationController : ApiController
    {
        public NotificationController()
        {
            Debug.WriteLine("test");
        }
        //private static Microsoft.Web.WebSockets.WebSocketCollection _wsClients = new Microsoft.Web.WebSockets.WebSocketCollection();

        internal static readonly System.Collections.Concurrent.ConcurrentBag<SubscriberInfo> _subscribers = new System.Collections.Concurrent.ConcurrentBag<SubscriberInfo>();

        internal class SubscriberInfo
        {

            public StreamWriter Stream { get; set; }

            public Guid ClientSessionGuid { get; set; }


        }


        public static void PublishMessage(Models.NotificationMessage msg)
        {
            foreach (var subscriberInfo in _subscribers)
            {
                try
                {
                    string jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(msg);
                    subscriberInfo.Stream.Write("event: message\n");
                    subscriberInfo.Stream.Write("data:" + jsonString + "\n\n");
                    subscriberInfo.Stream.FlushAsync();
                }
                catch (Exception)
                {
                    SubscriberInfo ignore;
                    ignore = subscriberInfo;
                    _subscribers.TryTake(out ignore);
                }
            }
        }

        [HttpGet]
        [Route("Notification/Subscribe")]
        public HttpResponseMessage Subscribe(HttpRequestMessage msg)
        {
            HttpResponseMessage resp = msg.CreateResponse();

            resp.Content = new PushStreamContent((a, b, c) =>
            { OnStreamAvailable(a, b, c); }, "text/event-stream");

            return resp;
        }

        [HttpGet]
        [Route("Notification/UnSubscribe")]
        public HttpResponseMessage UnSubscribe(HttpRequestMessage msg)
        {
            HttpResponseMessage resp = msg.CreateResponse();

            RemoveSubscriber(msg);

            resp.StatusCode = System.Net.HttpStatusCode.OK;

            return resp;
        }

        private SubscriberInfo AddSubscriber(StreamWriter stream)
        {
            var subsciber = new SubscriberInfo() { ClientSessionGuid = Guid.NewGuid(), Stream = stream };
            _subscribers.Add(subsciber);
            return subsciber;
        }

        private void RemoveSubscriber(HttpRequestMessage msg)
        {
            var strClientSessionGuid = msg.Headers.GetValues("ClientSessionGuid").FirstOrDefault();

            var clientSessionGuid = Guid.Parse(strClientSessionGuid);

            var subinfo = _subscribers.Where(x => x.ClientSessionGuid == clientSessionGuid).FirstOrDefault();
            if (subinfo != null)
            {
                var result = _subscribers.TryTake(out subinfo);
            }
        }

        private void OnStreamAvailable(Stream stream, HttpContent content, System.Net.TransportContext context)
        {
            var client = new StreamWriter(stream);
            var subInfo = AddSubscriber(client);
            content.Headers.Add("ClientSessionGuid", subInfo.ClientSessionGuid.ToString());
        }

    }
}
