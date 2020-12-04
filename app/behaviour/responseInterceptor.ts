
import type { Metadata } from '@grpc/grpc-js'
import type { Http2CallStream } from '@grpc/grpc-js/build/src/call-stream';
import { appConfigStore, NetworkTapMode } from '../stores';
import { requestResponseEditorStore } from '../stores/appConfigStore';
import type { ResponseInfo, RpcProtoInfo } from './models';
import { GRPCEventType, GRPCRequest, ResponseMetaInformation } from './sendRequest';

interface ResponseInterceptorCallback {
    responseMessage: ResponseInfo
}


export async function responseInterceptor({ responseMessage }: ResponseInterceptorCallback): Promise<ResponseInfo> {
    requestResponseEditorStore.setResponse(JSON.stringify(responseMessage.data, null, 2))
    const config = await appConfigStore.getValue();
    const transformedResponse = await transformResponse({ response: responseMessage, networkTapMode: config.networkTapMode })
    return transformedResponse
}

interface ResponseTransformerInput { response: ResponseInfo, networkTapMode: NetworkTapMode }

async function transformResponse(transformerInput: ResponseTransformerInput): Promise<ResponseInfo> {
    let storeUnSubscriber: Function = () => { };
    const transformedResponse = await new Promise<ResponseInfo>((resolve, reject) => {
        if (transformerInput.networkTapMode == NetworkTapMode.passThrough) {
            resolve(transformerInput.response)
        }
        else if (transformerInput.networkTapMode == NetworkTapMode.liveEdit) {
            // storeUnSubscriber = appConfigStore.subscribe(async config => {
            //     switch (config.responseLiveEditState) {
            //         case "sendInitiated":
            //             const newResponseString = (await requestResponseEditorStore.getValue()).responseText
            //             const newResponseObject = JSON.parse(newResponseString)
            //             resolve({ ...transformerInput.response, data: newResponseObject });
            //             break;
            //         default:
            //             break;
            //     }
            // })
        }
    });
    storeUnSubscriber();
    return transformedResponse
}