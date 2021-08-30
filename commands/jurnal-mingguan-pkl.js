const fetch = require("node-fetch");
const db = require('quick.db');
const dWord = ['satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan',
    'sepuluh', 'sebelas', 'dua belas', 'tiga belas', 'empat belas'];

module.exports = {
    name: 'jurnal-mingguan-pkl',
    description: 'Isi jurnal mingguan PKL. Total minggu: 1-14',
    usage:'&&jurnal-mingguan-pkl <minggu ke> <kegiatan> <hasil yang dicapai>',
    example: '&&jurnal-mingguan-pkl 1 Mempelajari_struktur_dan_algoritma_pemrograman_java Gak_ada',
    execute(Discord, message, args){
        if (args[0] == undefined || args[1] == undefined || args[2] == undefined) return message.lineReply("Terdapat field yang kosong, jalankan perintah `&&help jurnal-mingguan-pkl` untuk melihat contoh pengisian field.")
        data = {
            nis: db.get(`data_${message.author.id}.nis`),
            nama:  db.get(`data_${message.author.id}.nama`),
            rayon: db.get(`data_${message.author.id}.rayon`),
            jurusan: db.get(`data_${message.author.id}.jurusan`),
            instansi: {
                nama: db.get(`data_${message.author.id}.instansi.nama`), 
                pembimbing: db.get(`data_${message.author.id}.instansi.pembimbing`), 
                divisi: db.get(`data_${message.author.id}.instansi.divisi`)
            }
        }

        if (Object.values(data).some(x => x == null)) return message.lineReply("Personal data belum / tidak lengkap, jalankan perintah `&&help set-data-pkl` atau `&&help edit-data-pkl`.");

        const periode = 'Agustus s/d Oktober 2021';
        let week;

        dWord.forEach((item, index) => {
            if ((index + 1) == args[0]) {
                week = args[0] + ` (${item})`;
            }
        });

        let url = `https://docs.google.com/forms/d/e/1FAIpQLScs-S1j3Jw6SVV5PXWgBMT03NKf8WLNT4O909_g2atT0fBlaw/formResponse`;
        url += `?entry.829190584=${periode}`;
        url += `&entry.834673945=${week}`;
        url += `&entry.1034704219=${data.nama}`;
        url += `&entry.575908500=${data.nis}`;
        url += `&entry.1546181307=${data.rayon}`;
        url += `&entry.1834358553=${data.jurusan}`;
        url += `&entry.1048608406=${data.instansi.nama}`;
        url += `&entry.584985983=${data.instansi.pembimbing}`;
        url += `&entry.432046909=${data.instansi.divisi}`;
        url += `&entry.497287683=${args[1].split("_").join(" ")}`;
        url += `&entry.1629167108=${args[0].split("_").join(" ")}`;
        url = url.split(" ").join("%20");

        fetch(
            url,
            {
                method: 'GET',
            }
        )
        .then(() => {
            let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Sukses mengisi jurnal minggu ke-${args[0]}`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription(`Periode: ${periode}`)
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

            return message.lineReply(replyEmbed);
        })
        .catch((error) =>  {
            message.lineReply('There\'s an error occured while fetching API. Error: ' + error);
        });
    }

}