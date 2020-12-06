var PROTO_PATH = __dirname + "/greeter-service.proto";

const grpc = require('@grpc/grpc-js')
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var hello_proto = grpc.loadPackageDefinition(packageDefinition).hello_world;

function main() {
    var client = new hello_proto['Greeter'](
        "localhost:50053",
        grpc.credentials.createInsecure()
    );
    client.sayHello({
        name: 'request'
    }, function (err, response) {
        console.log("Greeting:", response.message);
    });
}

main();