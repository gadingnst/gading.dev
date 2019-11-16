const users = [
  {
    id: '5dceb86102337703c854190a',
    name: 'Sutan',
    major: 'Computer Engineering'
  },
  {
    id: '5dcecda23fec3694452e60f4',
    name: 'Rina',
    major: 'Computer Engineering'
  },
  {
    id: '5dcecdb4ccc2fb3a1fd89498',
    name: 'Alexander',
    major: 'Business Development'
  },
  {
    id: '5dcecdbed9e56c16706ffd2e',
    name: 'Alexandra',
    major: 'Accounting'
  }
]

const whiteList = [
  {
    id: 1,
    name: 'Sepatu'
  },
  {
    id: 2,
    name: 'Sandal'
  },
  {
    id: 3,
    name: 'Indomie'
  },
  {
    id: 4,
    name: 'Telor Bebek'
  },
  {
    id: 5,
    name: 'Aqua'
  }
]

let amounts = [1000, 100, 200, 10000, 6000, 200000]

function kasus1() {
  const filtering = users.filter(user => user.name.toLowerCase().includes('alex'))
  const finding = users.find(user => user.name.toLowerCase().includes('alex'))
  document.getElementById('filter').textContent = 'Hasil filter: ' + JSON.stringify(filtering, null, 2)
  document.getElementById('find').textContent = 'Hasil find: ' + JSON.stringify(finding, null, 2)
}

function kasus2() {
  const isInWhiteList = productId => whiteList.find(item => item.id === productId)
  document.getElementById('whitelist1').textContent = 'Hasil pertama: ' + JSON.stringify(isInWhiteList(5), null, 2)
  document.getElementById('whitelist2').textContent = 'Hasil kedua: ' + JSON.stringify(isInWhiteList(9), null, 2)
}

function kasus3() {
  const find = whiteList.find(item => item.id === 4)
  const findIndex = whiteList.findIndex(item => item.id === 4)

  document
    .getElementById('case3-find')
    .textContent =
      'Hasil find: ' + JSON.stringify(find, null, 2)

  document
    .getElementById('case3-findIndex')
    .textContent =
      'Hasil findIndex: ' + JSON.stringify(findIndex, null, 2)
}

function kasus4() {
  let fruits = ['Mango', 'Apple', 'Banana', 'Orange', 'Grape']
  fruits = fruits.sort()

  document
    .getElementById('case4-result')
    .textContent =
      'Hasil urut: ' + JSON.stringify(fruits)
}

function kasus5() {
  amounts = amounts.sort()

  document
    .getElementById('case5-result')
    .textContent =
      'Hasil urut: ' + JSON.stringify(amounts)
}

function kasus6() {
  amounts = amounts.sort((a, b) => a > b ? 1 : -1)

  document
    .getElementById('case6-result')
    .textContent =
      'Hasil urut: ' + JSON.stringify(amounts)
}

function kasus7() {
  const log = document.getElementById('case7-log')
  log.textContent = ''
  amounts = amounts.sort((a, b) => {
    document.getElementById('case7-log').textContent += `Log: a(${a}) > b(${b}) ? ${a > b ? 1 : -1}\n`
    return a > b ? 1 : -1
  })

  document.getElementById('case7-result').textContent = 'Hasil urut: ' + amounts
}
