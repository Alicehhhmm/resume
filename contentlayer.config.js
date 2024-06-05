import {defineDocumentType, defineNestedType, makeSource} from "contentlayer/source-files"
import {codeImport} from "remark-code-import"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypePrettyCode from "rehype-pretty-code"

const LinksProperties = defineNestedType(() => ({
    name: "LinksProperties",
    fields: {
        post: {
            type: "string",
        },
        api: {
            type: "string",
        },
    },
}))

export const Post = defineDocumentType(() => ({
    name: "Post",
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: "string",
            required: true
        },
        date: {
            type: "date",
            required: true
        },
        description: {
            type: "string",
            required: false
        },
        links: {
            type: "nested",
            of: LinksProperties
        }
    },
    computedFields: {
        url: {
            type: "string",
            resolve: (post) => `/posts/${post._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: "posts",
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [remarkGfm, codeImport, remarkMath],
        rehypePlugins: [
            rehypeSlug,
            rehypeKatex,
            [
                rehypePrettyCode,
                {
                    theme: "material-theme-palenight",
                },
            ],
        ],
    }
})
