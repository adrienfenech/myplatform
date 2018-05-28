/**
 * Created at 29/12/2017
 * By Adrien
 */

const history = require('../tools/history');

module.exports = (app, jsonParser) => {
    app.get('/chat', (req, res) => {

        history.push('[DISPLAY] /chat');

        res.render('chat', {
            context: {
                hello: 'world'
            }
        });
    });

    app.get('/chat/update', (req, res) => {

        const query = req.query.query || '';

        history.push('[GET] /chat with ' + query);

        setTimeout(() => {
            return res.status(200).json({ value: getAnswer() });
        }, Math.random() * 3000);
    });
};

function getAnswer() {
    switch (Math.round(Math.random() * 10)) {
        case 0: return 'Check presence !';
        case 1: return 'On dit "pain au chocolat".';
        case 2: return 'Champion !';
        case 3: return 'Retourne bosser !';
        case 4: return 'Elle est où la petite Julie pendant le bonbardement ?';
        case 5: return 'Hoooooooooooooooooooooooo !';
        case 6: return 'Je crois que dans la saison 8, Winterfell et les Stark...';
        case 7: return 'De toute façon, ils ne peuvent pas faire redoubler toute une promo !';
        case 8: return 'Ca va être tout noir !';
        case 9: return 'J\'ai pas envie de te parler.';
        default: return 'Hasta la vista, Baby.';
    }
}