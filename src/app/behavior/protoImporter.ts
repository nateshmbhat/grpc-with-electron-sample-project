import { loadPackageDefinition } from "@grpc/grpc-js";
import type { PackageDefinition } from "@grpc/grpc-js/build/src/make-client";
import { load, loadSync } from "@grpc/proto-loader/build/src/index";

const sampleProtoPath =
  "/home/nateshmbhat/Desktop/tap-wire/internals/testing/grpc/protos/greeter-service.proto";

export const importAndParseProto = (
  protoFilePath: string = sampleProtoPath
) => {
  var packageDefinition: PackageDefinition = loadSync(protoFilePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  console.dir(packageDefinition)
  console.log(loadPackageDefinition(packageDefinition));
};
