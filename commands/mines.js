const { Random } = require('random-js')
const random = new Random()

module.exports = {
    info: {
        name: "Mines",
        description: "Predicts a mines game using server hash",
        usage: "[1-24] [Server Hash]",
        aliases: []
    },

    run: async function(client, message, args){

        if(!args[0] || +args[0] > 24 || +args[0] < 1) return message.reply({
            embeds: [{
                description: `Your first argument is not between 1 and 24`,
                color: 0xff0000
            }]
        })

        if(!args[1] || +args[1].length < 64) return message.reply({
            embeds: [{
                description: `Your second argument must be a valid Server Hash`,
                color: 0xff0000
            }]
        })
 
        let guess = +args[0];

        let guessRandom1 = [random.integer(60, 85), random.integer(50, 65), random.integer(30, 50), random.integer(20, 30), random.integer(3, 15)]
        let guessRandom = 0;

        if(guess < 4) guessRandom = guessRandom1[0]
        if(guess >= 4 && guess < 6) guessRandom = guessRandom1[1]
        if(guess >= 6 && guess < 10) guessRandom = guessRandom1[2]
        if(guess >= 10 && guess < 20) guessRandom = guessRandom1[3]
        if(guess >= 20) guessRandom = guessRandom1[4]

        let five = [['❓', '❓', '❓', '❓', '❓'], ['❓', '❓', '❓', '❓', '❓'], ['❓', '❓', '❓', '❓', '❓'], ['❓', '❓', '❓', '❓', '❓'], ['❓', '❓', '❓', '❓', '❓']]

        let spots = +args[0]-20 < 1 ? 4 : 25-(+args[0])

        let i = 0;

        while(i !== spots) {
            var a = [random.integer(0, 4), random.integer(0, 4)]
            if(five[a[0]][a[1]] === '✅') continue;
            five[a[0]][a[1]] = '✅'
            i++
        }

        message.reply({
            embeds: [{
                author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                },
                title: `Your Predictor ; Mines Predictor`,
                description: `${five[0].join('  ')}\n${five[1].join('  ')}\n${five[2].join('  ')}\n${five[3].join('  ')}\n${five[4].join('  ')}`,
                fields: [{
                    name: 'Success',
                    value: `${guessRandom}%`
                }]
            }]
        })

    }
}
