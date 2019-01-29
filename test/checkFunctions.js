module.exports = {
    /** @description for tests that we expected there is no exception
     *  @param fn = function to check exceptions
     */
    check: fn => () => {
        try {
            fn();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    },
    /** @description for tests that we expected it will throw exception with the given message
     *  @param fn function to check 
     *  @param exceptionMessage message that we expect from exception
     */
    checkForException: (fn,exceptionMessage) => () => {
        try {
            fn();
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBeDefined();
            expect(e.message).toBe(exceptionMessage);
        }
    }
};
