import type { Server } from "@grpc/grpc-js";
import { writable } from "svelte/store";
import type { RpcProtoInfo } from "../behaviour/models";

export enum LiveEditState {
  disabled = 'disabled',
  enabled = 'enabled',
  editingInProgress = 'editingInProgress',
  sendInitiated = 'sendInitiated',
  sendingInProgress = 'sendInProgress'
}

export interface AppConfigModel {
  selectedRpc: RpcProtoInfo | null;
  mockGrpcServerUrl: string;
  targetGrpcServerUrl: string;
  mockGrpcServer: Server | null;
  networkTapMode: NetworkTapMode;
  requestLiveEditState: LiveEditState;
  responseLiveEditState: LiveEditState;
}

export enum NetworkTapMode {
  passThrough = 'passThrough',
  liveEdit = 'liveEdit',
}

export interface RequestResponseEditorModel {
  requestText: string;
  responseText: string;
}

function createAppConfigStore() {
  const { set, subscribe, update } = writable<AppConfigModel>({
    selectedRpc: null,
    mockGrpcServerUrl: 'localhost:50051',
    targetGrpcServerUrl: 'localhost:50053',
    mockGrpcServer: null,
    networkTapMode: NetworkTapMode.passThrough,
    requestLiveEditState: LiveEditState.disabled,
    responseLiveEditState: LiveEditState.disabled
  });

  return {
    subscribe,
    setConfig: (config: AppConfigModel) => set(config),
    setSelectedRpc: (rpcInfo: RpcProtoInfo) => update((config) => ({ ...config, selectedRpc: rpcInfo })),
    setMockGrpcServerUrl: (url: string) => update((config) => ({ ...config, mockGrpcServerUrl: url })),
    setMockGrpcServer: (server: Server) => update((config) => {
      return ({ ...config, mockGrpcServer: server });
    }),
    setTargetGrpcServerUrl: (url: string) => update((config) => ({ ...config, targetGrpcServerUrl: url })),
    setNetworkTapMode: (mode: NetworkTapMode) => update(config => ({ ...config, networkTapMode: mode })),
    setRequestLiveEditState: (liveEditState: LiveEditState) => update(config => ({ ...config, requestLiveEditState: liveEditState })),
    setResponseLiveEditState: (liveEditState: LiveEditState) => update(config => ({ ...config, responseLiveEditState: liveEditState }))
  };
}

function createRequestResponseEditorStore() {
  const { set, subscribe, update } = writable<RequestResponseEditorModel>({
    requestText: JSON.stringify({}),
    responseText: JSON.stringify({}),
  })
  return {
    subscribe,
    setRequest: (data: string) => update((store) => ({ ...store, requestText: data })),
    setResponse: (data: string) => update((store) => ({ ...store, responseText: data })),
    setValue: (data: RequestResponseEditorModel) => set(data)
  }
}


export const appConfigStore = createAppConfigStore();
export const requestResponseEditorStore = createRequestResponseEditorStore();
