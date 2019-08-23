/* eslint-disable */
let tahunLahir = [1998, 1999, 2000, 2001, 2002]

let orang = [
  { nama: 'Sutan', umur: 16 },
  { nama: 'Joni', umur: 18 },
  { nama: 'Mark', umur: 27 },
  { nama: 'Back', umur: 14 },
  { nama: 'Toni', umur: 24},
]

let keranjang = [
  {
    produk: 'Indomie Mie Goreng',
    harga: 2500
  },
  {
    produk: 'Aqua Gelas',
    harga: 500
  },
  {
    produk: 'Sepatu Sport',
    harga: 75000
  }
]

function withoutMap() {
  const umur = []
  for (let i = 0; i < tahunLahir.length; i++) {
    umur.push(new Date().getFullYear() - tahunLahir[i])
  }
  alert(umur)
}

function withMap() {
  const umur = tahunLahir.map(tahun => new Date().getFullYear() - tahun)
  alert(umur)
}

function withoutFilter() {
  const orangDiizinkan = []

  for (let i = 0; i < orang.length; i++) {
    if (orang[i].umur >= 18) {
      orangDiizinkan.push(orang[i].nama);
    }
  }

  alert(orangDiizinkan) // ['Joni','Mark','Toni']
}

function withFilter() {
  orang = orang.filter(orang => orang.umur >= 18)
  alert(orang.map(orang => orang.nama)) // ['Joni','Mark','Toni']
}

function withoutReduce() {
  let totalHarga = 0
  for (let i = 0; i < keranjang.length; i++) {
    totalHarga += keranjang[i].harga
  }
  alert('Rp.' + totalHarga)
}

function withReduce() {
  const totalHarga = keranjang.reduce((acc, cur) => acc + cur.harga, 0)
  alert('Rp.' + totalHarga)
}

function kasus() {
  const siswa = [
    {
      nama: 'Sutan Gading',
      nilaiTugas: 70,
      nilaiUts: 80,
      nilaiUas: 74
    },
    {
      nama: 'Alex',
      nilaiTugas: 30,
      nilaiUts: 40,
      nilaiUas: 97
    },
    {
      nama: 'Si Muning',
      nilaiTugas: 25,
      nilaiUts: 40,
      nilaiUas: 75
    },
    {
      nama: 'Toni Stark',
      nilaiTugas: 60,
      nilaiUts: 70,
      nilaiUas: 94
    },
    {
      nama: 'Jay Boy',
      nilaiTugas: 40,
      nilaiUts: 50,
      nilaiUas: 54
    }
  ]

  const siswaLulus = siswa.map(item => ({
    nama: item.nama,
    nilaiAkhir: (item.nilaiTugas * 0.2) + (item.nilaiUts * 0.3) + (item.nilaiUas * 0.5)
  })).filter(item => item.nilaiAkhir >= 60)

  const rataNilaiLulus = siswaLulus.reduce((acc, cur) => acc + cur.nilaiAkhir, 0) / siswaLulus.length

  document.getElementById('siswa').textContent = 'Siswa yang lulus: ' + JSON.stringify(siswaLulus, null, 2)
  document.getElementById('ratanilai').textContent = 'Rata-rata nilai siswa yang lulus: ' + Number(rataNilaiLulus).toFixed(2)
}
