import { Options } from './types';
export declare function seqSchemaToDynamoSchema(seqSchema: Options, jsonAsObject: boolean): Options;
export default class Dynamo {
    options: Options;
    constructor(...args: []);
    define(name: string, seqSchema: Options): any;
    authenticate(): void;
}
