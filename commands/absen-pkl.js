const fetch = require("node-fetch");
const db = require('quick.db');

module.exports = {
    name: 'absen-pkl',
    description: 'Absenin PKL Harian',
    usage:'&&absen-pkl',
    example: '&&absen-pkl',
    execute(Discord, message, args){
        data = {
            nis: db.get(`data_${message.author.id}.nis`),
            nama:  db.get(`data_${message.author.id}.nama`),
            rayon: db.get(`data_${message.author.id}.rayon`),
            jurusan: db.get(`data_${message.author.id}.jurusan`),
            rombel: db.get(`data_${message.author.id}.rombel`),
            instansi: {
                nama: db.get(`data_${message.author.id}.instansi.nama`), 
                pembimbing: db.get(`data_${message.author.id}.instansi.pembimbing`), 
                divisi: db.get(`data_${message.author.id}.instansi.divisi`)
            }
        }

        if (Object.values(data).some(x => x == null)) return message.lineReply("Personal data belum / tidak lengkap, jalankan perintah `&&help set-data-pkl` atau `&&help edit-data-pkl`.");

        const periode = 'Agustus s/d Oktober 2021';

        const today = new Date(new Date().toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' }));

        let year = today.getFullYear();
        let month = ("0" + (today.getMonth() + 1)).slice(-2);
        let date = ("0" + today.getDate()).slice(-2);

        let url = `https://docs.google.com/forms/d/e/1FAIpQLSdm_NZsgcbGQOvtIcy8S7Yi_jSkA7bGYC7Q3i9ArnPd79qGaQ/formResponse`;
        url += `?entry.1166618695=${periode}`;
        url += `&entry.1609864390=${year}-${month}-${date}`;
        url += `&entry.1784542591=${data.nama}`;
        url += `&entry.556066437=${data.nis}`;
        url += `&entry.1083762165=${data.rayon}`;
        url += `&entry.1916179045=${data.jurusan}`;
        url += `&entry.1884758966=${data.rombel}`;
        url += `&entry.2009198964=${data.instansi.nama}`
        url += `&entry.1429400563=${data.instansi.pembimbing}`
        url = url.split(" ").join("%20");

        fetch(
            url,
            {
                method: 'GET',
            }
        )
        .then(() => {
            let replyEmbed = new Discord.MessageEmbed()
                .setTitle(`Sukses absen PKL hari ini!`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription(`Periode: ${periode}`)
                .setTimestamp()
                .setFooter(`Diminta oleh ${message.author.username}`);

            message.lineReply(replyEmbed);

            let embed = new Discord.MessageEmbed()
                .setTitle(`Link Absen PKL`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription(url.split('formResponse').join('viewform'))
                .addField('Diatas merupakan link absen yang berhasil kami kirim', '\u200B')
                .setFooter(`aquila non captat muscas`)

            return message.author.send(embed);
        })
        .catch((error) =>  {
            message.lineReply('There\'s an error occured while fetching API. Error: ' + error);
        });
    }

}