/*
 * Package @donmahallem/readme
 * Source https://donmahallem.github.io/js-libs/
 */


import { remark } from 'remark'
import remarkGfm from 'remark-gfm';
import remarkGitContributors from 'remark-gfm';
import remarkHtml from 'remark-html'
import remarkLicense from 'remark-license';
import remarkParse from 'remark-parse';
import remarkToc from 'remark-toc';
import { reporter } from 'vfile-reporter'

remark()
    .use(remarkToc)
    .use(remarkGfm)
    .use(remarkParse)
    .use(remarkGitContributors)
    .use(remarkLicense)
    // .use(remarkPresetLintRecommended)
    .use(remarkHtml)
    .process('## Hello world!')
    .then((file) => {
        console.error(reporter(file))
        console.log(String(file))
    })
