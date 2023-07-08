import { ImageVersions2, Post, QuotedPost, ThreadsAPI } from 'threads-api';

export const targetUsername = 'gadingnst';
export const targetTag = '#gadingnst_blog';

export const threadsAPI = new ThreadsAPI();

export function getContentImages(_singleImg: ImageVersions2, _carouselImg: any[]) {
  const imgUrls: string[] = [];
  const singleImage = _singleImg.candidates;
  if (_carouselImg) {
    for (const _img of _carouselImg) {
      imgUrls.push(_img.image_versions2.candidates[0].url);
    }
  } else if (singleImage.length > 0) {
    imgUrls.push(singleImage[0].url);
  }
  return imgUrls;
}

function getContents(_post: Post|QuotedPost) {
  let caption = '';
  const imgs: string[] = [];
  const _username = _post.user.username;
  const _caption = _post.caption?.text;
  const _firstImage = _post.image_versions2;
  const _carouselMedia = _post.carousel_media;
  if (_username === targetUsername) {
    caption = _caption ?? '';
    const imgUrls = getContentImages(_firstImage, _carouselMedia);
    if (imgUrls.length > 0) {
      for (const _img of imgUrls) {
        imgs.push(`![](${_img})`);
      }
    }
  }
  return {
    caption,
    imgs
  };
}

export async function getThreads(_postPk: string) {
  const _tp = await threadsAPI.getThreads(_postPk);
  if (!_tp.reply_threads) return [];

  const threads: string[] = [];
  const _tr = _tp.reply_threads[0];

  if (_tr) {
    for (const _trt of _tr.thread_items) {
      const { caption, imgs } = getContents(_trt.post);
      if (caption) threads.push(caption);
      if (imgs.length > 0) {
        for (const _img of imgs) {
          threads.push(_img);
        }
      }
    }
  } else {
    const _tc = _tp.containing_thread;
    const q_t = _tc.thread_items[0].post.text_post_app_info.share_info.quoted_post;
    if (q_t) {
      const { caption, imgs } = getContents(q_t);
      if (caption) threads.push(caption);
      if (imgs.length > 0) {
        for (const _img of imgs) {
          threads.push(_img);
        }
      }
      const _res = await getThreads(q_t.pk);
      for (const _caption of _res) {
        threads.push(_caption);
      }
    }
  }

  return threads;
}
