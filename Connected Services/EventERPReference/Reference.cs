﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EventERP.EventERPReference {
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="EventERPReference.IEventErp_Interface")]
    public interface IEventErp_Interface {
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventErp_Interface/PERFORM_ACTIONS", ReplyAction="http://tempuri.org/IEventErp_Interface/PERFORM_ACTIONSResponse")]
        string PERFORM_ACTIONS(string ACTION_REQUEST, string MethodDetails);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/IEventErp_Interface/PERFORM_ACTIONS", ReplyAction="http://tempuri.org/IEventErp_Interface/PERFORM_ACTIONSResponse")]
        System.Threading.Tasks.Task<string> PERFORM_ACTIONSAsync(string ACTION_REQUEST, string MethodDetails);
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface IEventErp_InterfaceChannel : EventERP.EventERPReference.IEventErp_Interface, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class EventErp_InterfaceClient : System.ServiceModel.ClientBase<EventERP.EventERPReference.IEventErp_Interface>, EventERP.EventERPReference.IEventErp_Interface {
        
        public EventErp_InterfaceClient() {
        }
        
        public EventErp_InterfaceClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public EventErp_InterfaceClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EventErp_InterfaceClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public EventErp_InterfaceClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        public string PERFORM_ACTIONS(string ACTION_REQUEST, string MethodDetails) {
            return base.Channel.PERFORM_ACTIONS(ACTION_REQUEST, MethodDetails);
        }
        
        public System.Threading.Tasks.Task<string> PERFORM_ACTIONSAsync(string ACTION_REQUEST, string MethodDetails) {
            return base.Channel.PERFORM_ACTIONSAsync(ACTION_REQUEST, MethodDetails);
        }
    }
}
