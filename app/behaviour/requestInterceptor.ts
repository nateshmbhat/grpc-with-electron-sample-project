import type { Metadata } from '@grpc/grpc-js'
import type { Http2CallStream } from '@grpc/grpc-js/build/src/call-stream';
import { appConfigStore } from '../stores/appConfigStore';
import type { RpcProtoInfo, ResponseInfo } from './models';
import { GRPCEventType, GRPCRequest, ResponseMetaInformation } from './sendRequest';

interface RequestInterceptorCallback {
    call: Http2CallStream,
    metadata: Metadata,
    requestMessage: Object,
    rpcProtoInfo: RpcProtoInfo,
}


export function requestInterceptor({ call, metadata, requestMessage, rpcProtoInfo }: RequestInterceptorCallback): Promise<ResponseInfo> {
    const responsePromise = new Promise<ResponseInfo>((resolve, reject) => {
        appConfigStore.subscribe(config => {
            console.log('metadata : ', metadata)
            console.log('request message : ', requestMessage)
            console.log('call : ', call)
            console.log('rpc protoInfo : ', rpcProtoInfo)

            const grpcRequest = new GRPCRequest({
                inputs: JSON.stringify(requestMessage),
                metadata: JSON.stringify(metadata.getMap()),
                url: config.targetGrpcServerUrl,
                rpcProtoInfo: rpcProtoInfo
            })


            grpcRequest.on(GRPCEventType.ERROR, (e: Error, metaInfo: ResponseMetaInformation) => {
                console.error('GRPC ERROR EVENT : ', e, metaInfo)
                reject(e)
            });

            grpcRequest.on(GRPCEventType.DATA, (data: object, metaInfo: ResponseMetaInformation) => {
                if (metaInfo.stream) {
                    //TODO : handle streaming call
                } else {
                    resolve({ data, isStreaming: false, metaInfo })
                }
            });

            grpcRequest.on(GRPCEventType.END, () => {
                console.warn('GRPC End Event')
            });

            try {
                grpcRequest.send();
            } catch (e) {
                console.error(e);
                grpcRequest.emit(GRPCEventType.END);
            }
        })();
    });
    return responsePromise;
}