import type { GrpcObject } from "@grpc/grpc-js";

export interface Proto{
    fileName :string;
    filePath :string;
    ast : GrpcObject
}

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
    methodsMocks: ServiceMethodsPayload,
    methodsName: string[],
  }
