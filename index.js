import * as grpc from '@grpc/grpc-js'

var PROTO_PATH = __dirname + '/greeter-service.proto';

var protoLoader = require('@grpc/proto-loader');
var packageDefinition= protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var hello_world_package = grpc.loadPackageDefinition(packageDefinition);

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  console.log('Request : ', call)
  setTimeout(() => {
    callback(null, { message: 'Hello ' + call.request.name });
  }, 0);
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
export function startDummyGrpcTargetServer({ port }) {
  var server = new grpc.Server();
  //@ts-ignore
  server.addService(hello_world_package.hello_world.Greeter['service'], { sayHello: sayHello });
  server.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(error, port)
    }
    else {
      console.log('Dummy Grpc Test Server started at port : ', port)
      console.log(process.versions)
      server.start();
    }
  });
}


startDummyGrpcTargetServer({port:50053})