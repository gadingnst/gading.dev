import createContentLocales from '@/packages/libs/I18n/locales';

const withHeroTerminalLocales = createContentLocales({
  inputLabel: {
    en: 'Terminal: type a command, try help',
    id: 'Terminal: ketik command, coba help'
  },
  placeholder: {
    en: 'try help',
    id: 'coba help'
  },
  asUsual: {
    en: '# as usual',
    id: '# as usual'
  },
  help: {
    en: 'commands: whoami, cat now.txt, cat mood.txt, ls posts, open <slug|number>, clear',
    id: 'commands: whoami, cat now.txt, cat mood.txt, ls posts, open <slug|nomor>, clear'
  },
  nowEmpty: {
    en: 'now.txt is empty. Probably asleep.',
    id: 'now.txt kosong. Mungkin lagi tidur.'
  },
  loading: {
    en: 'fetching posts…',
    id: 'mengambil tulisan…'
  },
  loadFailed: {
    en: 'ls: cannot read posts (network). Try again?',
    id: 'ls: gagal membaca tulisan (network). Coba lagi?'
  },
  lsHint: {
    en: '→ open 1 to read the first one',
    id: '→ open 1 untuk membaca yang pertama'
  },
  lsUsage: {
    en: 'ls: only posts lives here. Try ls posts',
    id: 'ls: di sini cuma ada posts. Coba ls posts'
  },
  openUsage: {
    en: 'usage: open <slug|number>, see ls posts',
    id: 'cara pakai: open <slug|nomor>, lihat ls posts'
  },
  openNotFound: {
    en: 'open: no such post:',
    id: 'open: tulisan tidak ditemukan:'
  },
  opening: {
    en: 'opening',
    id: 'membuka'
  },
  catUsage: {
    en: 'cat: try now.txt or mood.txt',
    id: 'cat: coba now.txt atau mood.txt'
  },
  catMissing: {
    en: 'No such file or directory',
    id: 'No such file or directory'
  },
  sudo: {
    en: 'gading is not in the sudoers file. This incident will be reported (to the cat).',
    id: 'gading is not in the sudoers file. Insiden ini akan dilaporkan (ke kucing).'
  },
  notFound: {
    en: 'command not found: {cmd}, try help',
    id: 'command not found: {cmd}, coba help'
  }
});

export default withHeroTerminalLocales;
