'use client';
import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { copyToClipboard } from '@/utils';
import { CheckIc, CopyIc } from '@/components/icons';

const mkd = `## Features

- **Fast:** since it's basically one regex and a huge if statement
- **Tiny:** it's 1kb of gzipped ES3
- **Simple:** pass a Markdown string, get back an HTML string

> **Note:** Tables are not yet supported. If you love impossible to read regular expressions, submit a PR!
>
> **Note on XSS:** Snarkdown [doesn't sanitize HTML](https://github.com/developit/snarkdown/issues/70), since its primary target usage doesn't require it.

# 🎄 AdventJS 2022

Although it has its roots in Catholicism, Advent has become a tradition where children got chocolate for 4 weeks, one per day, from 1 to 24 December. Here we adapt it to programming challenges.

## Solutions

| Challenge | Solution                                                                |
| --------- | ----------------------------------------------------------------------- |
| 1         | [Automating Christmas gift wrapping!](/v2022/challenge01/index.js)      |
`;
export function Markdown() {
  const [isCopied, setIsCopied] = useState(false);
  const html = marked(mkd);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 1000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [isCopied]);
  return (
    <div className='flex flex-col md:flex-row gap-4 w-full'>
      <div className='w-full rounded-md overflow-hidden relative'>
        <textarea
          className='border border-black dark:border-white/20 rounded-md text-black dark:text-white resize-none w-full h-full outline-none p-5 bg-white/95 dark:bg-white/5'
          readOnly
          defaultValue={mkd}
        ></textarea>
        <button
          className='absolute right-4 top-4 rounded-md p-1.5 hover:bg-white/10 transition-colors duration-200'
          onClick={async () => {
            setIsCopied(!isCopied);
            await copyToClipboard(mkd);
          }}
        >
          {isCopied ? (
            <CheckIc className='w-4 h-4' />
          ) : (
            <CopyIc className='w-4 h-4' />
          )}
        </button>
      </div>
      <div className='border border-black dark:border-white/20 w-full rounded-md p-5 bg-white/95 dark:bg-white/5'>
        <article
          className='w-full prose prose-sm prose-neutral dark:prose-invert max-w-none'
          dangerouslySetInnerHTML={{ __html: html }}
        ></article>
      </div>
    </div>
  );
}
