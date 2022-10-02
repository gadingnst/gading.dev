interface PopupConfig {
  url: string;
  title: string;
  w: number;
  h: number;
}

/**
 * Create center Pop-Up on secondary window
 * @param config - window popup configuration
 * @returns {Window} - Browser Window
 * @see https://stackoverflow.com/a/16861050/8112320
 */
function createPopUp(config: PopupConfig): Window|null {
  const { url, title, w, h } = config;

  if (typeof window === 'undefined') {
    throw new Error('Create Pop-Up must be on Client Side.');
  }

  const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
  const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

  const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(url, title,
    `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
  );

  newWindow?.focus();

  return newWindow;
}

export default createPopUp;
