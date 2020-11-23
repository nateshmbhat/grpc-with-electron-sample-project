import { remote } from 'electron';
import { fromFileName, mockRequestMethods, mockResponseMethods, Proto, walkServices } from 'bloomrpc-mock-js';
import * as path from "path";
import type { ProtoFile, ProtoService } from './protobuf';
import type { Service } from 'protobufjs';
import type { ServiceDefinition } from '@grpc/grpc-js';

const commonProtosPath = [
  // @ts-ignore
  path.join(__static),
  // @ts-ignore
  path.join(__static  , '/home/nateshmbhat/Desktop/bloomrpc-svelte/static/sample/'),
];

export type OnProtoUpload = (protoFiles: ProtoFile[], err?: Error) => void

/**
 * Upload protofiles
 * @param onProtoUploaded
 * @param importPaths
 */
export async function importProtos(onProtoUploaded: OnProtoUpload, importPaths?: string[]) {
  const result = await remote.dialog.showOpenDialog( remote.getCurrentWindow(),{
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Protos', extensions: ['proto'] },
    ]
  }); 
  console.log(result)
  // async (filePaths: string[]) => {
  //   if (!filePaths) {
  //     return;
  //   }
  //   await loadProtos(filePaths, importPaths, onProtoUploaded);
  // });
}

/**
 * Load protocol buffer files
 * @param filePaths
 * @param importPaths
 * @param onProtoUploaded
 */
export async function loadProtos(filePaths: string[], importPaths?: string[], onProtoUploaded?: OnProtoUpload): Promise<ProtoFile[]> {
  try {
    const protos = await Promise.all(filePaths.map((fileName) =>
      fromFileName(fileName, [
        ...(importPaths ? importPaths : []),
        ...commonProtosPath,
      ])
    ));

    const protoList = protos.reduce((list: ProtoFile[], proto: Proto) => {

      // Services with methods
      const services = parseServices(proto);

      // Proto file
      list.push({
        proto,
        fileName: proto.fileName.split(path.sep).pop() || "",
        services,
      });

      return list;
    }, []);
    onProtoUploaded && onProtoUploaded(protoList, undefined);
    return protoList;

  } catch (e) {
    console.error(e);
    onProtoUploaded && onProtoUploaded([], e);

    if (!onProtoUploaded) {
      throw e;
    }

    return [];
  }
}

/**
 * Parse Grpc services from root
 * @param proto
 */
function parseServices(proto: Proto) {
  const services: {[key: string]: ProtoService} = {};
  walkServices(proto, (service: Service, serviceClientImpl: any, serviceName: string) => {
    const requestMocks = mockRequestMethods(service);
    const responseMocks = mockResponseMethods(service);
    const serviceDefinition = serviceClientImpl.service 
    console.log('Service definition : ' , serviceDefinition) 
    services[serviceName] = {
      serviceName: serviceName,
      proto,
      serviceDefinition : serviceDefinition,
      requestMocks: requestMocks,
      responseMocks : responseMocks,
      methodNames: Object.keys(requestMocks),
    };
  });

  return services;
}

export function importResolvePath(): Promise<string> {
  return new Promise((resolve, reject) => {
    
    const result = remote.dialog.showOpenDialog( remote.getCurrentWindow(),{
      properties: ['openDirectory'],
      filters: []
    })
    console.log(result);
    
    // (filePaths: string[]) => {
    //   if (!filePaths) {
    //     return reject("No folder selected");
    //   }
    //   resolve(filePaths[0]);
    // });
  })

}
