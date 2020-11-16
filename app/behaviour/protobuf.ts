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
  requestMocks: ServiceMethodsPayload,
  responseMocks: ServiceMethodsPayload,
  methodsName: string[],
}
