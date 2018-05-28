/**
 * Created at 29/12/2017
 * By Adrien
 */

const history = require('../tools/history');

module.exports = (app, jsonParser) => {
    app.get('/history', (req, res) => {

        history.push('[DISPLAY] /history');

        res.render('history', {
            context: {
                hello: 'world'
            }
        });
    });

    app.get('/history/update', (req, res) => {

        const query = req.query.query || '';

        history.push('[GET] /history with ' + query);

        setTimeout(() => {
            return res.status(200).json({ value: history.get() });
        }, Math.random() * 3000);
    });

    app.get('/history/flush', (req, res) => {

        setTimeout(() => {
            return res.status(200).json({ value: history.flush() });
        }, Math.random() * 3000);
    });
};