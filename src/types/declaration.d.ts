declare module '*.svg?url' {
  const content: any;
  export default content;
}

interface Window {
  twttr?: {
    widgets: {
      load: () => void;
    };
  };
}
