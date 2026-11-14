import useStore from 'swr-global-state';

/**
 * Open state of the command palette, shared by the palette itself and
 * whatever opens it (the keyboard shortcut, the mobile header menu).
 */
function useCommandPalette() {
  const [isOpen, setIsOpen] = useStore<boolean>({
    key: 'app-command-palette-open',
    initial: false
  });
  return { isOpen, setIsOpen };
}

export default useCommandPalette;
