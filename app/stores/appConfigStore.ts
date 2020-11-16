import { writable } from "svelte/store";
import type { RpcProtoInfo } from "../behaviour";

export interface AppConfigModel {
  selectedRpc: RpcProtoInfo | null;
}

function createStore() {
  const { set, subscribe, update } = writable<AppConfigModel>({
    selectedRpc: null,
  });

  return {
    subscribe,
    setConfig : (config:AppConfigModel)=> set(config) , 
    setSelectedRpc: (rpcInfo: RpcProtoInfo) => update((config) => ({ ...config, selectedRpc: rpcInfo })),
  };
}

export const appConfigStore = createStore();
