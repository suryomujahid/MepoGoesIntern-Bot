module.exports = {
    name: 'convert',
    description: 'Konversi kalimat yang memiliki `spasi` menjadi `_` (underscore)',
    usage:'&&convert <kalimat>',
    example: '&&convert lorem ipsum dolor sit amet',
    execute(Discord, message, args){
        if (args.join(" ") == '') return message.lineReply('Masukin kalimatnya dulu bang');

        const sentence = args.join(" ");

        return message.lineReply(sentence.split(' ').join('_'));
    }

}