
import type { Metadata } from '@grpc/grpc-js'
import type { Http2CallStream } from '@grpc/grpc-js/build/src/call-stream';
import { appConfigStore } from '../stores';
import type { ResponseInfo, RpcProtoInfo } from './models';
import { GRPCEventType, GRPCRequest, ResponseMetaInformation } from './sendRequest';

interface ResponseInterceptorCallback {
    responseMessage: ResponseInfo
}


export function responseInterceptor({ responseMessage }: ResponseInterceptorCallback): Promise<ResponseInfo> {
    return new Promise<ResponseInfo>((resolve, reject) => {
        appConfigStore.subscribe(config => {
            resolve(responseMessage)
        })();
    })
}