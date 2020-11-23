import * as grpc from '@grpc/grpc-js'
import type { ServiceDefinition } from '@grpc/grpc-js'
import type { RpcProtoInfo } from './protoInfo'

function getServer(serviceDefinition: ServiceDefinition) {
  const server = new grpc.Server();
  const serviceImplementation: grpc.UntypedServiceImplementation = {}
  Object.keys(serviceDefinition).map((serviceName: string) =>
    serviceImplementation[serviceName] = (request: any) => { console.log('got request : ', request) })
  server.addService(serviceDefinition, serviceImplementation);
  return server;
}

export const startGrpcServer = (serviceDefinition: ServiceDefinition) => {
  const grpcServer = getServer(serviceDefinition);
  grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(error)
    }
    else {
      console.log("Started server at port : ", port)
      grpcServer.start();
    }
  });
}
