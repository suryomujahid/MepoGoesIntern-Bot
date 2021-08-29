const db = require('quick.db');

module.exports = {
    name: 'data-pkl',
    description: 'Cek personal data untuk pengisian form PKL',
    usage:'&&data-pkl',
    example: '&&data-pkl',
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
        if (Object.values(data).some(x => x == null)) return message.lineReply("Isi data PKL terlebih dahulu, jalankan perintah `&&help set-data-pkl` untuk info lebih lanjut.");

        let embed = new Discord.MessageEmbed()
                .setTitle(`Personal Data PKL`)
                .setColor('RANDOM')
                .setAuthor('MepoGoesIntern', 'https://static.wikia.nocookie.net/meme-yeet/images/2/2e/Roll_safe.png/revision/latest?cb=20190630031720')
                .setDescription('Untuk mengganti salah satu field, jalankan perintah `&&help edit-data-pkl` didalam server.')
                .addField(`NIS: `, data.nis)
                .addField(`Nama: `, data.nama)
                .addField(`Rayon: `, data.rayon)
                .addField(`Jurusan: `, data.jurusan)
                .addField(`Rombel: `, data.rombel)
                .addField(`Nama Instansi: `, data.instansi.nama)
                .addField(`Pembimbing Instansi: `, data.instansi.pembimbing)
                .addField(`Divisi: `, data.instansi.divisi)
                .setTimestamp()
                .setFooter('ad meliora');

        message.author.send(embed);
        return message.react('✅');
    }

}