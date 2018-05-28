/**
 * Created at 29/12/2017
 * By Adrien
 */

const history = require('../tools/history');

module.exports = (app, jsonParser) => {
    app.get('/time', (req, res) => {

        history.push('[DISPLAY] /time');

        res.render('time', {
            context: {
                hello: 'world'
            }
        });
    });

    app.get('/time/update', (req, res) => {

        const query = req.query.query || '';

        history.push('[GET] /time with ' + query);

        setTimeout(() => {
            return res.status(200).json({
                value: [
                    {
                        id: 'ny',
                        name: 'New York',
                        time: new Date()
                    }, {
                        id: 'sydney',
                        name: 'Sydney',
                        time: new Date()
                    }, {
                        id: 'singapore',
                        name: 'Singapore',
                        time: new Date()
                    }, {
                        id: 'hlp',
                        name: 'Hyères-les-palmiers',
                        time: new Date()
                    }
                ]
            });
        }, Math.random() * 3000);
    });
};