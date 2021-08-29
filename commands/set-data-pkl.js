const db = require('quick.db');
const field = ['nama', 'nis', 'rayon', 'jurusan', 'rombel', 'instansi.nama', 'instansi.pembimbing', 'instansi.divisi'];

module.exports = {
    name: 'set-data-pkl',
    description: 'Data untuk absensi PKL harian',
    usage:'&&set-data-pkl <nama> <nis> <rayon> <jurusan> <rombel> <nama instansi> <nama pembimbing> <divisi>',
    example: '&&set-data-pkl Ketoprak_Sayur XXXX6969 Cianjur_2 RPL RPL_XI2 PT_Mochi_Mepo Pak_Jaya Full_Stuck_Overflow',
    execute(Discord, message, args){
        let next = true;
        for (i = 0; i < 8; i++) {
            if (args[i] == undefined) {
                message.lineReply("Terdapat field yang kosong, jalankan perintah `&&data-pkl help` untuk melihat contoh pengisian field.");
                next = false;
                break;
            }
        }

        if (next === false) return;

        for (i = 0; i < 8; i++) {
            args[i] = args[i].split("_").join(" ");
            db.set(`data_${message.author.id}.${field[i]}`, args[i]);
        }

        let embed = new Discord.MessageEmbed()
                .setTitle(`Sukses mengatur data PKL!`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription(`Raw Data: ${args.join(", ")}`)
                .setTimestamp()
                .setFooter('non fortuna homines aestimabo, sed moribus');
        message.author.send(embed);
        return message.react('✅')

    }

}