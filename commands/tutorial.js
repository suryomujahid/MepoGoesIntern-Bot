module.exports = {
    name: 'tutorial',
    description: 'Tutorial penggunaan bot',
    usage:'&&tutorial',
    example: '&&tutorial',
    execute(Discord, message, args){
        return message.channel.send(`**Tata Cara Penggunaan Bot MepoGoesIntern**

1) Sebelum melakukan absen atau jurnal mingguan, setup data personal terlebih dahulu dengan melakukan command \`&&help set-data-pkl\`;
2) Setelah setup data personal, verifikasi terlebih dahulu data tersebut dengan command \`&&data-pkl\`. Bot akan mengirim DM berisi data personal milikmu;
3) Jika terdapat kesalahan ketika pengisian data, gunakan \`&&help edit-data-pkl\`;
4) Jika sudah sesuai, kamu bisa menggunakan command absen dan jurnal mingguan pkl.
        
*tips: gunakan command \`&&convert <kalimat>\` untuk mengkonversi spasi menjadi underscore*`);
    }

}