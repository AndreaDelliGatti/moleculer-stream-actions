import { Service, ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";

export default class ApiService extends Service {

    public constructor(broker: ServiceBroker) {
        super(broker);
        // @ts-ignore
        this.parseServiceSchema({
            name: "api",
            mixins: [ApiGateway],
            settings: {
                port: process.env.PORT || 4000,

                routes: [
                    {
                        path: "/api",
                        whitelist: [
                            "a.*"
                        ],
                        use: [],
                        mergeParams: true,
                        authentication: true,
                        authorization: false,
                        autoAliases: true,

                        aliases: {},
                        callingOptions: {},

                        bodyParsers: {
                            json: {
                                limit: 10 * 1024 * 1024
                            },
                            urlencoded: {
                                extended: true,
                                limit: 10 * 1024 * 1024
                            },
                        },

                        mappingPolicy: "all",
                        logging: true
                    }
                ],

                log4XXResponses: false,
                logRequestParams: null,
                logResponseData: null
            }
        });
    }
}
