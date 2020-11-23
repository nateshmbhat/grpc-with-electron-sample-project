import { writable } from "svelte/store";
import type { ProtoFile, RpcProtoInfo } from "../behaviour";
import { fetchProtoFiles } from "../disk_storage";

function createStore() {
  const { subscribe, set, update } = writable<ProtoFile[]>(fetchProtoFiles());
  return {
    subscribe,
    setProtoFiles : (protoFiles:ProtoFile[])=>{
       set(protoFiles) 
    }
  };
}

export const protoFilesStore = createStore();
