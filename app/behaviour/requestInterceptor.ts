import { Metadata } from '@grpc/grpc-js'
import { Http2CallStream } from '@grpc/grpc-js/build/src/call-stream';

interface RequestInterceptorCallback { call: Http2CallStream, metadata: Metadata, request: Object }

export function requestInterceptor({call,metadata ,request }:RequestInterceptorCallback) {
    
}