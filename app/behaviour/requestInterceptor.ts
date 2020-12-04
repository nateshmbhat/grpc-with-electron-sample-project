import type { Metadata } from '@grpc/grpc-js'
import type { Http2CallStream } from '@grpc/grpc-js/build/src/call-stream';
import { appConfigStore, LiveEditState, NetworkTapMode, RequestResponseEditorModel, requestResponseEditorStore } from '../stores/appConfigStore';
import type { RpcProtoInfo, ResponseInfo } from './models';
import { GRPCEventType, GRPCRequest, ResponseMetaInformation } from './sendRequest';

interface RequestInterceptorCallback {
    call: Http2CallStream,
    metadata: Metadata,
    requestMessage: Object,
    rpcProtoInfo: RpcProtoInfo,
}


export function requestInterceptor({ call, metadata, requestMessage, rpcProtoInfo }: RequestInterceptorCallback): Promise<ResponseInfo> {
    const responsePromise = new Promise<ResponseInfo>(async (resolve, reject) => {
        const config = await appConfigStore.getValue()
        console.log('metadata : ', metadata)
        console.log('request message : ', requestMessage)
        console.log('call : ', call)
        console.log('rpc protoInfo : ', rpcProtoInfo)

        requestResponseEditorStore.setRequest(JSON.stringify(requestMessage, null, 2))
        const transformedRequest = await requestTransformer({ metadata, requestMessage, networkTapMode: config.networkTapMode })
        console.log('transformedRequest : ', transformedRequest)

        const grpcRequest = new GRPCRequest({
            inputs: JSON.stringify(transformedRequest.requestMessage),
            metadata: JSON.stringify(transformedRequest.metadata.getMap()),
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
    });
    return responsePromise;
}


interface RequestTransformerInput { requestMessage: Object, metadata: Metadata, networkTapMode: NetworkTapMode }
interface RequestTransformerOutput { requestMessage: Object, metadata: Metadata }

async function requestTransformer(request: RequestTransformerInput): Promise<RequestTransformerOutput> {
    let storeUnSubscriber: Function = () => { };
    const transformedRequest = await new Promise<RequestTransformerOutput>((resolve, reject) => {
        if (request.networkTapMode == NetworkTapMode.passThrough) {
            resolve(request)
        }
        else if (request.networkTapMode == NetworkTapMode.liveEdit) {
            storeUnSubscriber = appConfigStore.subscribe(async config => {
                switch (config.requestLiveEditState) {
                    case "sendInitiated":
                        const newRequestString = await new Promise<string>((res, rej) => requestResponseEditorStore.subscribe(state => res(state.requestText))());
                        const newRequestObject = JSON.parse(newRequestString)
                        resolve({ metadata: request.metadata, requestMessage: newRequestObject });
                        break;
                    default:
                        break;
                }
            })
        }
    });
    storeUnSubscriber();
    return transformedRequest
}