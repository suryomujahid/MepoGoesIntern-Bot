const db = require('quick.db');
const field = ['nama', 'nis', 'rayon', 'jurusan', 'rombel', 'instansi.nama', 'instansi.pembimbing', 'instansi.divisi'];

module.exports = {
    name: 'edit-data-pkl',
    description: 'Edit Personal Data untuk pengisian form PKL. Field yang tersedia: `' + field.join(', ') + '`',
    usage:'&&edit-data-pkl <field> <value>',
    example: '&&edit-data-pkl nama John_Doe',
    execute(Discord, message, args){
        if (args[0] == undefined || args[1] == undefined) return message.lineReply("Terdapat field yang kosong, jalankan perintah `&&help edit-data-pkl` untuk melihat contoh pengisian field.")

        if (!field.includes(args[0])) return message.lineReply("Field yang diberikan salah. Field yang tersedia: " + field.join(', '));

        args[1] = args[1].split("_").join(" ");
        db.set(`data_${message.author.id}.${args[0]}`, args[1]);

        let embed = new Discord.MessageEmbed()
                .setTitle(`Sukses memperbarui data PKL!`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription(`Raw Data: ${args.join(', ')}`)
                .setTimestamp()
                .setFooter('aut cum scuto aut in scuto');
        message.author.send(embed);
        return message.react('✅')

    }

}