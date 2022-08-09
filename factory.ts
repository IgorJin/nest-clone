const http = require("http");
export const isFunction = (val: any): boolean => typeof val === 'function';
export const isConstructor = (val: any): boolean => val === 'constructor';
export const apiPrefix = '/api'

interface InstaceInfo {
  method: string;
  path: string;
  methodName: string;
}

export class NestFactoryStatic {
  public async create(module: any) {
    const httpServer = http.createServer((req: any, response: any) => {
      console.log('server started');
      response.writeHead(200, {'Content-Type': 'text/html'})
      const { url, method: requestMethod } = req

      if (url === '/') {
        response.write("<h2>hello world4</h2>");
        response.end();
      }

      // get controllerMethod
      const controller = Reflect.getMetadata('controllers', module)
      const provider = Reflect.getMetadata('providers', module)

      const service = new provider[0]
      const instance = new controller[0](service)

      const scanForPaths = (prototype: any, cb: any): InstaceInfo[] => {
        return Object.getOwnPropertyNames(prototype)
          .filter(name => !isConstructor(name) && isFunction(prototype[name]))
          .map(cb)
      }


      const exploreMethodMetadata = function(instancePrototype: any, methodName: any) {
        const method = Reflect.getMetadata('method', instancePrototype[methodName])
        const path = Reflect.getMetadata('path', instancePrototype[methodName])

        return {
          methodName,
          method, 
          path,
        }
      }

      const instancePrototype = Object.getPrototypeOf(instance)

      console.log("🚀 ~ file: factory.ts ~ line 48 ~ NestFactoryStatic ~ httpServer ~ instancePrototype", instancePrototype)
      const instanceMethods: InstaceInfo[] = scanForPaths(
        instancePrototype, 
        (method: any) => exploreMethodMetadata(instancePrototype, method)
      )

      console.log("🚀 ~ file: factory.ts ~ line 35 ~ NestFactoryStatic ~ httpServer ~ instanceMethods", instanceMethods)

      for (const { methodName, method, path } of instanceMethods) {
        if (url === `${apiPrefix}${path}` && requestMethod === method) {
          const result = instance[methodName]()

          response.write(result);
        }
      }
      
      response.end();
    })

    // await this.initialize(module, container, applicationConfig, httpServer);

    // const instance = new NestApplication(
    //   container,
    //   httpServer,
    //   applicationConfig,
    //   appOptions,
    // );
    // const target = this.createNestInstance(instance);

    return httpServer;
  }
}





