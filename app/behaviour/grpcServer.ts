import * as grpc from '@grpc/grpc-js'
import type { ServiceDefinition } from '@grpc/grpc-js'
import type { RpcProtoInfo } from './models/protoInfo'
import type { AppConfigModel } from '../stores/appConfigStore';

function addGrpcServices(server: grpc.Server | null, serviceDefinitions: ServiceDefinition[]): void {
  if (server == null) {
    console.warn('Tried to add service when the server is not yet ready !')
    return;
  }

  serviceDefinitions.forEach(serviceDefinition => {
    const serviceImplementation: grpc.UntypedServiceImplementation = {}
    Object.keys(serviceDefinition).map((serviceName: string) =>
      serviceImplementation[serviceName] = (request: any) => { console.log('got request : ', request) })
    server.addService(serviceDefinition, serviceImplementation);
  })
}

export const startMockGrpcServer = (appConfig: AppConfigModel, serviceDefinitions: ServiceDefinition[]): Promise<grpc.Server> => {
  const grpcServer = new grpc.Server();
  
  addGrpcServices(grpcServer, serviceDefinitions)
  const serverPromise = new Promise<grpc.Server>((resolve, reject) => {
    grpcServer.bindAsync(appConfig.mockGrpcServerUrl, grpc.ServerCredentials.createInsecure(), (error, port) => {
      if (error) {
        console.error(error)
        reject(error)
      }
      else {
        console.log("Started server at port : ", port)
        grpcServer.start();
        resolve(grpcServer)
      }
    });
  });
  return serverPromise;
}
