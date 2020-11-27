import type { Server, ServiceDefinition } from "@grpc/grpc-js";
import { writable } from "svelte/store";
import type { RpcProtoInfo } from "../behaviour";

export interface AppConfigModel {
  selectedRpc: RpcProtoInfo | null;
  mockGrpcServerUrl: string;
  targetGrpcServerUrl: string;
  mockGrpcServer: Server | null;
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
