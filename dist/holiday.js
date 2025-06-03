export async function isHariLiburNasional(date, type = 'libur') {
    const year = date.getFullYear();
    let data;
    try {
        data = (await import(`../data/libur/${year}.json`)).default;
    }
    catch (e) {
        console.warn(`Data hari libur untuk tahun ${year} tidak ditemukan.`);
        return false;
    }
    const formatted = `${year}-${String(date.getMonth() + 1)}-${date.getDate()}`;
    return data.some((item) => {
        const tanggalBersih = item.tanggal.replace(/^0+/, '').replace(/-0+/g, '-');
        const isMatch = tanggalBersih === formatted;
        if (!isMatch)
            return false;
        if (type === 'semua')
            return true;
        if (type === 'cuti')
            return item.keterangan.toLowerCase().includes('cuti');
        if (type === 'libur')
            return !item.keterangan.toLowerCase().includes('cuti');
        return false;
    });
}
