import { defineDocumentType, makeSource } from "contentlayer/source-files"

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
            required: true
        },
        link: {
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
})
