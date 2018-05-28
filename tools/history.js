/**
 * Created at 28/05/2018
 * By Adrien
 */

const _ = [];

module.exports = {
    push: (msg) => {
        _.push(msg);

        return _;
    },

    get: () => {
        return _;
    },

    flush: () => {
    _.splice(0, _.length);
        return _;
    },
};