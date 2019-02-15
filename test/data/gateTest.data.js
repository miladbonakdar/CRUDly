const config = {
    root: "api/v1",
    defaultActionsConfig: {
        timeout: 1000
    },
    defaultActions: [{ type: "get", name: "getType" }],
    controllers: [
        {
            name: "users",
            loadDefaults: true,
            actions: [
                { type: "post" },
                { type: "put" },
                {
                    type: "delete",
                    url: "remove/:id" //TODO: check if it starts with '/' or not
                },
                { type: "get", params: ["id"] }, //get?id=123123
                { type: "head" },
                { type: "patch" },
                {
                    type: "get",
                    name: "dastan",
                    url: "customAction/:id/:age/:name" //TODO: check if it starts with '/' or not
                },
                {
                    type: "post",
                    name: "testPost",
                    url: "testkon" //TODO: check if it starts with '/' or not
                },
                {
                    type: "get",
                    name: "testGet",
                    url: "testkon", //TODO: check if it starts with '/' or not
                    params: ["id"]
                }
            ]
        },
        {
            name: "posts",
            loadDefaults: false,
            actions: [
                { type: "post" },
                { type: "put" },
                {
                    type: "delete",
                    url: "remove/:id" //TODO: check if it starts with '/' or not
                },
                { type: "get", params: ["id"] }, //get?id=123123
                { type: "head" },
                { type: "patch" }
            ]
        }
    ]
};

const testController = {
    name: "todos",
    loadDefaults: true,
    actions: [
        { type: "post" },
        { type: "put" },
        {
            type: "delete",
            url: "remove/:id" //TODO: check if it starts with '/' or not
        },
        { type: "get", params: ["id"] }, //get?id=123123
        { type: "head" },
        { type: "patch" }
    ]
};

module.exports = {
    testConfig: config,
    testController
};
