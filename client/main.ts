import * as grpcWeb from 'grpc-web';
import {GreeterClient} from '../files/web/HelloServiceClientPb';
import {HelloRequest, HelloReply} from '../files/web/hello_pb';

const htmlInputElement = (id: string) => {
  return <HTMLInputElement>document.getElementById(id);
};

const sayHello = async  () => {
  const greeterService = new GreeterClient('http://localhost:50052', null, null);

  const request = new HelloRequest();
  var name = (<HTMLInputElement>document.getElementById("name")).value;
  request.setName(name);

  const call = greeterService.sayHello(request, null,
    (err: grpcWeb.RpcError, response: HelloReply) => {
      if (err) {
        console.log(err)
        return
      }

      var reply = document.getElementById("reply");
      reply.textContent = response.getMessage();
        
      console.log("hello:", response);
  });

  call.on('status', (status: grpcWeb.Status) => {
    console.log("status:", status);
  });
};

htmlInputElement("sendBtn").addEventListener("click", sayHello);