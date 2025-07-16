import { useCallback } from 'react';

import { downloadFile } from '@/packages/libs/File/download';

function useImageTools(imageUrl?: string) {
  const handleZoom = useCallback(() => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  }, [imageUrl]);

  const handleDownload = useCallback(() => {
    if (imageUrl) {
      downloadFile({
        data: imageUrl,
        fileName: imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
        fileType: 'image/png'
      });
    }
  }, [imageUrl]);

  return { handleZoom, handleDownload };
}

export default useImageTools;
