import { AUTHOR_GITHUB } from '@/configs/author';

/**
 * TODO: put your CV at public/media/authors/resume.pdf, then render it instead:
 * <iframe src="/media/authors/resume.pdf" className="h-screen w-full" />
 */
function ResumePage() {
  return (
    <main className="grid min-h-screen place-items-center p-8 text-center">
      <p>
        Resume coming soon. Meanwhile, see my{' '}
        <a className="text-primary underline" href={`https://github.com/${AUTHOR_GITHUB}`}>GitHub</a>.
      </p>
    </main>
  );
};

export default ResumePage;
