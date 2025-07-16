import { useCallback } from 'react';

function useImageTools(imageUrl: string | null | undefined) {
  const handleZoom = useCallback(() => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }, [imageUrl]);

  const handleDownload = useCallback(() => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [imageUrl]);

  return { handleZoom, handleDownload };
}

export default useImageTools;
