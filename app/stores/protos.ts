import { writable } from "svelte/store";
import type { ProtoFile, ProtoInfo } from "../behaviour";
import { fetchProtoFiles } from "../disk_storage";

function createStore() {
  const { subscribe, set, update } = writable<ProtoFile[]>(fetchProtoFiles());
  return {
    subscribe,
    onProtoLoaded : (protoFiles:[])=>{

    }
  };
}

export const protosStore = createStore();
