/* eslint-disable */
const tahunLahir = [1998, 1999, 2000, 2001, 2002]

let orang = [
  { nama: 'Sutan', umur: 16 },
  { nama: 'Joni', umur: 18 },
  { nama: 'Mark', umur: 27 },
  { nama: 'Back', umur: 14 },
  { nama: 'Toni', umur: 24},
]

const keranjang = [
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
    umur.push(2019 - tahunLahir[i])
  }
  alert(umur)
}

function withMap() {
  const umur = tahunLahir.map(tahun => 2019 - tahun)
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
