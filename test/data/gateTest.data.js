const config = {
    root: "api/v1",
    defaultActionsConfig: {
        timeout: 1000
    },
    defaultActions: [{ type: "get", name: "getType", url: "getType" }],
    controllers: [
        {
            name: "users",
            loadDefaults: true,
            actions: [
                { type: "post" },
                { type: "put" },
                {
                    type: "delete",
                    url: "/:id"
                },
                { type: "get", params: ["id"] }, //get?id=123123
                { type: "head" },
                { type: "patch" },
                {
                    type: "get",
                    name: "dastan",
                    url: "customAction/:id/:age/:name"
                },
                {
                    type: "post",
                    name: "testPost",
                    url: "testkon"
                },
                {
                    type: "get",
                    name: "testGet",
                    url: "getTestkon",
                    params: ["id","name"]
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
                    url: ":id"
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
            url: "remove/:id"
        },
        { type: "get", params: ["id"] }, //get?id=123123
        { type: "head" },
        { type: "patch" }
    ]
};

const testController2 = {
    name: "ajjab",
    loadDefaults: false
};

const testActions = [
    { type: "post", name: "test1" },
    { type: "put", name: "test2" },
    { type: "get", params: ["id", "type"], name: "test3" }, //get?id=123123
    { type: "head", name: "test4" },
    { type: "patch", name: "test5" },
    {
        type: "get",
        name: "test6",
        loadDefaultConfig: false,
        url: "customAction/:id/:age/:name"
    },
    {
        type: "get",
        name: "test7",
        url: "testkon",
        params: ["id"]
    },
    {
        type: "delete",
        name: "testAction",
        url: "remove/:userId/:postId",
        loadDefaultConfig: false
    }
];

const actionList = [
    { type: "DELETE" },
    { type: "GET" },
    { type: "POST" },
    { type: "Put" },
    { type: "head" },
    { type: "patch" }
];

module.exports = {
    testConfig: config,
    testController,
    testController2,
    testActions,
    actionList
};
