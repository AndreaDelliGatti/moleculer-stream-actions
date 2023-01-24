import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";
import * as fs from "fs";
import { ReadStream } from "fs";
var stream = require('stream');
import * as path from "path";

const TMP_FOLDER = path.join(__dirname, "tmp");

export default class BucketService extends Service {
    // @ts-ignore
    public constructor(public broker: ServiceBroker) {
        super(broker);

        let schema: ServiceSchema = {
            name: "bucket",
            settings: {},
            actions: {
                "download": {
                    params: {
                        filename: "string|convert:true"
                    },
                    handler: (ctx: Context<{ filename: string }>) => {
                        const { filename } = ctx.params;
                        const filepath = path.join(TMP_FOLDER, filename);

                        if (!fs.existsSync(filepath)) throw new Error('file not found');

                        return fs.createReadStream(filepath);
                    }
                },
                "upload": {
                    handler: (ctx: Context<ReadStream, { filename: string }>) => {
                        if (!this.isReadableStream(ctx.params)) throw new Error('invalid read stream');

                        let s = fs.createWriteStream(path.join(TMP_FOLDER, ctx.meta.filename));
                        ctx.params.pipe(s);

                        return new Promise((resolve, reject) => {
                            s.on('finish', () => { resolve('file saved'); });
                            s.on('error', (e) => { reject(e); })
                        });
                    }
                }
            },
            methods: {
                isReadableStream: (obj: any) => {
                    return obj instanceof stream.Stream &&
                        (typeof obj._read === 'function') &&
                        (typeof obj._readableState === 'object');
                }
            },
            created: () => {
                if (!fs.existsSync(TMP_FOLDER)) fs.mkdirSync(TMP_FOLDER);
            }
        };

        this.parseServiceSchema(schema);
    }
}