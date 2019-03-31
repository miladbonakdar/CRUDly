const requestOptions = {
    url: '/url/:first/:last',
    body: 'body',
    params: [],
    urlParams: [':first',':last'],
    method: 'get',
    config: {},
    extra: {},
    craetedOn: new Date(),
    startedOn: null,
    responsedOn: null,
    _isPending: false,
    response: null,
    axiosConfig: null
};

module.exports = requestOptions;
