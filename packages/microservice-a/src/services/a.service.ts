import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";
import * as fs from "fs";
import { ReadStream, WriteStream } from "fs";
import * as path from "path";

const TMP_FOLDER = path.join(__dirname, "tmp");

export default class AService extends Service {
    // @ts-ignore
    public constructor(public broker: ServiceBroker) {
        super(broker);

        let schema: ServiceSchema = {
            name: "a",
            settings: {},
            actions: {
                get: {
                    rest: {
                        method: "GET",
                        path: "/get"
                    },
                    handler: async (ctx: Context) => {
                        let stream = await broker.call('bucket.download', { filename: 'test.kml' }) as ReadStream;
                        let s = fs.createWriteStream(path.join(TMP_FOLDER, 'test.kml'));

                        stream.pipe(s);

                        let p = new Promise<string>((resolve, reject) => {
                            s.on('finish', () => { resolve('file downloaded'); });
                            s.on('error', (e) => { reject(e); })
                        });

                        let result = await p;
                        return result;
                    }
                },
                set: {
                    rest: {
                        method: "GET",
                        path: "/set"
                    },
                    handler: async (ctx: Context) => {
                        let stream = fs.createReadStream(path.join(TMP_FOLDER, 'upload.json'));
                        let result = await broker.call('bucket.upload', stream, { meta: { filename: 'upload.json' } }) as string;

                        return result;
                    }
                },
                created: () => {
                    if (!fs.existsSync(TMP_FOLDER)) fs.mkdirSync(TMP_FOLDER);
                }
            }
        }

        this.parseServiceSchema(schema);
    }
}