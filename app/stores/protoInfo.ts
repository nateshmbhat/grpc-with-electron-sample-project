import { derived, writable } from "svelte/store";
import { ProtoFile, ProtoService, RpcProtoInfo} from "../behaviour";
import { fetchProtoFiles } from "../disk_storage";
import { protoFilesStore } from "./protoFiles";

export const rpcProtoInfosStore = derived(protoFilesStore , ($protoFilesStore)=>{
    const protoFiles = $protoFilesStore
    const protoInfos : RpcProtoInfo[] = []

    protoFiles.forEach(protoFile=>{
        Object.entries(protoFile.services).forEach(([serviceName , service])=>{
           service.methodsName.forEach(method=>protoInfos.push(new RpcProtoInfo(service,method)))
        })
    })
    return protoInfos
})

export const servicesStore = derived(protoFilesStore , ($protoFilesStore)=>{
    const protoFiles = $protoFilesStore
    const services : ProtoService[] = []

    protoFiles.forEach(protoFile=>{
        Object.entries(protoFile.services).forEach(([serviceName , service])=>{
            services.push(service)
        })
    })
    return services
})