/**
 * Created at 29/12/2017
 * By Adrien
 */

const history = require('../tools/history');

module.exports = (app, jsonParser) => {
    app.get('/', (req, res) => {

        history.push('[DISPLAY] /main');

        res.render('main', {
            context: {
                hello: 'world'
            }
        });
    });
};