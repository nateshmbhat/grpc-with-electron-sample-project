import { writable } from "svelte/store";
import type { RpcProtoInfo } from "../behaviour";

export interface AppConfigModel {
  selectedRpc: RpcProtoInfo | null;
  grpcServerUrl : string;
}

function createStore() {
  const { set, subscribe, update } = writable<AppConfigModel>({
    selectedRpc: null,
    grpcServerUrl :'localhost:80'
  });

  return {
    subscribe,
    setConfig : (config:AppConfigModel)=> set(config) , 
    setSelectedRpc: (rpcInfo: RpcProtoInfo) => update((config) => ({ ...config, selectedRpc: rpcInfo })),
    setGrpcServerUrl : (url :string) => update((config)=>({...config , grpcServerUrl:url}))
  };
}

export const appConfigStore = createStore();
