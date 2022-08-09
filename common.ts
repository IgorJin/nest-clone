import 'reflect-metadata';

const PATH_METADATA = 'path'
const validPath = (path?: string) => path ? path.charAt(0) === '/' ? path : '/'+path : ''

export function Controller() {
  const path = '/';

  return (target: object) => { // NOTE: target = class like AppController. save this in Reflect.
    Reflect.defineMetadata(PATH_METADATA, path, target);
    // Reflect.defineMetadata(VERSION_METADATA, versionOptions, target);
  };
}

export function Module(metadata: any) {
  return (target: Function) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}

export function Get(path?: any) {
  return (target: any, name: any, descriptor:any) => {
    return reflectMethodMetadata(descriptor, validPath(path), 'GET')
  }
}

export function Post(path?: any) {
  return (target: any, name: any, descriptor:any) => {
    return reflectMethodMetadata(descriptor, validPath(path), 'POST')
  }
}

function reflectMethodMetadata(descriptor: any, path: any, method: any) {
  Reflect.defineMetadata('method', method, descriptor.value);
  Reflect.defineMetadata('path', validPath(path), descriptor.value);

  return descriptor
}
