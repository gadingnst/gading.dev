const getMimeType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    case 'pdf':
      return 'application/pdf';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
};

type DownLoadFileParams = {
  data: string | Blob;
  fileName: string;
  fileType?: string;
};

export async function downloadFile({ data, fileName, fileType }: DownLoadFileParams) {
  let blob: Blob;

  if (typeof data === 'string' && (data.startsWith('http') || data.startsWith('/'))) {
    try {
      const response = await fetch(data);
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      blob = await response.blob();
    } catch {
      window.open(data, '_blank');
      return;
    }
  } else if (data instanceof Blob) {
    blob = data;
  } else {
    const type = fileType || getMimeType(fileName);
    blob = new Blob([data], { type });
  }

  if (blob.size === 0) {
    if (typeof data === 'string') {
      window.open(data, '_blank');
    }
    return;
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
