import { Context, Service, ServiceBroker, ServiceSchema } from "moleculer";
import * as fs from "fs";
import { ReadStream } from "fs";
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
                        // if (!(ctx.params instanceof ReadStream)) throw new Error('invalid read stream');

                        let s = fs.createWriteStream(path.join(TMP_FOLDER, ctx.meta.filename));
                        ctx.params.pipe(s);

                        return new Promise((resolve, reject) => {
                            s.on('finish', () => { resolve('file saved'); });
                            s.on('error', (e) => { reject(e); })
                        });
                    }
                }
            },
            created: () => {
                if (!fs.existsSync(TMP_FOLDER)) fs.mkdirSync(TMP_FOLDER);
            }
        };

        this.parseServiceSchema(schema);
    }
}