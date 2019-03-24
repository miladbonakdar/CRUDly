const statics = require('./statics');

/**
 * @description helper function to create action config
 * @param actionType action type eg 'get' and default is get
 * @param actionName name of the action
 * @param params url query params
 * @param actionUrl action url
 */
const createActionConfig = (
    actionType = 'get',
    actionName = null,
    params = null,
    actionUrl = null
) => {
    actionType = actionType.toLowerCase();
    if (!statics.actionTypes.filter(type => type === actionType)[0])
        throw new Error(`Action type '${actionType}' is not valid`);
    let actionConfig = {};
    actionConfig.type = actionType;
    if (!actionName) actionName = statics.actionTypeMaps[actionType];
    if (actionName) actionConfig.name = actionName;
    if (actionUrl) actionConfig.url = actionUrl;
    if (
        (actionType === 'post' ||
            actionType === 'put' ||
            actionType === 'head' ||
            actionType === 'patch') &&
        params
    )
        throw new Error(`Action type ${actionType} should not have params`);
    if (params) {
        if (!Array.isArray(params)) throw new Error('the params should be an array');
        actionConfig.params = params;
    }
    return actionConfig;
};

module.exports = createActionConfig;
