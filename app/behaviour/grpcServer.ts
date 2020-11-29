import * as grpc from '@grpc/grpc-js'
import { AppConfigModel, appConfigStore } from '../stores';
import { requestInterceptor } from './requestInterceptor';
import type { ProtoService } from './models';
import { responseInterceptor } from './responseInterceptor';

function addGrpcServices(server: grpc.Server | null, serviceProtos: ProtoService[]): void {
  if (server == null) {
    console.warn('Tried to add service when the server is not yet ready !')
    return;
  }
  console.log('service protos : ', serviceProtos)
  serviceProtos.forEach(serviceProto => {
    const serviceImplementation: grpc.UntypedServiceImplementation = {}
    Object.entries(serviceProto.methods).forEach(([methodName, methodRpcInfo]) => {
      serviceImplementation[methodName] = (clientCall: any, callback: grpc.sendUnaryData<any>) => {
        requestInterceptor({
          call: clientCall.call, requestMessage: clientCall.request, metadata: clientCall.metadata,
          rpcProtoInfo: methodRpcInfo
        })
          .then(responseInfo =>
            responseInterceptor({ responseMessage: responseInfo })
          )
          .then(responseInfo => {
            callback(null, responseInfo.data)
          })
          .catch(e => {
            callback(e, null)
          });
      };
    })
    console.log('service proto-implmentation : ', serviceImplementation)
    server.addService(serviceProto.serviceDefinition, serviceImplementation);
  })
}

export const startMockGrpcServer = (serviceProtos: ProtoService[]): void => {
  const grpcServer = new grpc.Server();

  addGrpcServices(grpcServer, serviceProtos)
  appConfigStore.subscribe(config => {
    grpcServer.bindAsync(config.mockGrpcServerUrl, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error(error)
      }
      else {
        console.log("Started server at port : ", port)
        grpcServer.start();
        appConfigStore.setMockGrpcServer(grpcServer)
      }
    });
  })();
}
