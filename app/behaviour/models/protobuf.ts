import type { ServiceDefinition } from '@grpc/grpc-js';
import type { Proto, ServiceMethodsPayload } from 'bloomrpc-mock-js';

export interface ProtoFile {
  proto: Proto,
  fileName: string
  services: ProtoServiceList;
}

export interface ProtoServiceList {
  [key: string]: ProtoService,
}

export interface ProtoService {
  proto: Proto,
  serviceName: string,
  serviceDefinition : ServiceDefinition ,
  requestMocks: ServiceMethodsPayload,
  responseMocks: ServiceMethodsPayload,
  methodNames: string[],
}
