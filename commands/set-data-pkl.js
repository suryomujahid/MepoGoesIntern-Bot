const db = require('quick.db');
const field = ['nama', 'nis', 'rayon', 'jurusan', 'rombel', 'instansi.nama', 'instansi.pembimbing', 'instansi.divisi'];

module.exports = {
    name: 'set-data-pkl',
    description: 'Data untuk absensi PKL harian. Gunakan `_` sebagai **pengganti spasi**.',
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

            if (i === 3) {
                switch(args[i].toLowerCase()) {
                    case 'rpl':
                        args[i] = 'Rekayasa Perangkat Lunak (RPL)';
                        break;
                    case 'tkj':
                        args[i] = 'Teknik Komputer dan Jaringan (TKJ)';
                        break;
                    case 'mmd':
                        args[i] = 'Multimedia (MMD)';
                        break;
                    case 'bdp':
                        args[i] = 'Bisnis Daring dan Pemasaran (BDP)';
                        break;
                    case 'otkp':
                        args[i] = 'Otomatisasi dan Tata Kelola Perkantoran (OTKP)';
                        break;
                    case 'tbg':
                        args[i] = 'Tata Boga (TBG)';
                        break;
                    case 'htl':
                        args[i] = 'Perhotelan (HTL)';
                        break;
                    default:
                        message.lineReply("Field jurusan yang bisa digunakan: `rpl`, `tkj`, `mmd`, `otkp`, `bdp`, `htl`, `tbg`.");
                        next = false;
                }
            }

            if (next === false) {
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