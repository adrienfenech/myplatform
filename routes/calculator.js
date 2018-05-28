/**
 * Created at 29/12/2017
 * By Adrien
 */

const history = require('../tools/history');

module.exports = (app, jsonParser) => {
    app.get('/calculator', (req, res) => {

        history.push('[DISPLAY] /calculator');

        res.render('calculator', {
            context: {
                hello: 'world'
            }
        });
    });

    app.get('/calculator/update', (req, res) => {

        const query = req.query.query || '';

        history.push('[GET] /calculator with ' + query);

        setTimeout(() => {
            return res.status(200).json({ value: 42 });
        }, Math.random() * 3000);
    });
};