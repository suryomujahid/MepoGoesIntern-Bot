module.exports = {
    name: 'convert',
    description: 'Konversi kalimat yang memiliki `spasi` menjadi `_` (underscore). Hasil dari contoh: `ini_kalimat_pertama ini_kalimat_kedua`',
    usage:'&&convert <kalimat>',
    example: '&&convert ini kalimat pertama__ini kalimat kedua',
    execute(Discord, message, args){
        if (args.join(" ") == '') return message.lineReply('Masukin kalimatnya dulu bang');

        const sentence = args.join(" ");

        return message.lineReply("```" + sentence.split(' ').join('_') + "```" + "```" + sentence.split('__').join(" ") + "```");
    }

}