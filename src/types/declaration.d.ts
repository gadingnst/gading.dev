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

  umami?: {
    trackEvent: <T>(
      name: string,
      data: Record<string, T>,
      url?: string,
      websiteId?: string
    ) => void;
    trackView: (
      url: string,
      referrer?: string,
      websiteId?: string
    ) => void;
  };
}
