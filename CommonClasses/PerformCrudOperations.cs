using EventERP.EventERPReference;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace EventERP.CommonComponents
{
    public class PerformCrudOperations
    {
        public string PerformOpeartions(NameValueCollection forms, string MainXmlNodeName, string ServiceName)
        {
            string ResponseXml = string.Empty;
            GenerateXml xmlstring = new GenerateXml();
            string RequestXml = xmlstring.GenerateXmlString(forms, MainXmlNodeName, ServiceName);

            EventErp_InterfaceClient proxy = new EventErp_InterfaceClient();
            ResponseXml = proxy.PERFORM_ACTIONS(RequestXml, ServiceName);
            return ResponseXml;
        }
    }
}