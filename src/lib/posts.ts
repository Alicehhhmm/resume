import { promises as fsPromises } from "fs"
import path from "path"
import matter from "gray-matter"
import {compareDesc} from "date-fns";

const postsDirectory = path.join(process.cwd(), "src", "posts")

/**
 * @description 解析指定路径下的.mdx, .md文件
 * @param slug 动态路由路径
 * @return {meta,content} 详情信息、文章内容
 */
export async function getPostBySlug(slug: string): Promise<any> {
    const possibleExtensions = [".mdx", ".md"]
    let filePath, fileContent

    for (const ext of possibleExtensions) {
        filePath = path.join(postsDirectory, `${slug}${ext}`)
        try {
            fileContent = await fsPromises.readFile(filePath, "utf-8")
            break
        } catch (err: any) {
            // 如果文件不存在，继续尝试下一个扩展名
            if (err.code !== "ENOENT") throw err
        }
    }

    if (!fileContent) {
        throw new Error(`No file found for slug: ${slug}`)
    }

    const { data, content } = matter(fileContent)

    return {
        meta: data,
        content: content,
    }
}

/**
 * @description 获取指定路径下所有文件名
 * @return slugs 所有后缀.mdx, .md件名的集合
 */
export async function getAllPosts() {
    const slugs: Array<string | object> = []
    const allFile: Array<string | object> = []

    const processDirectory = async (dirPath: string, baseSlug = "") => {
        const entries = await fsPromises.readdir(dirPath, {
            withFileTypes: true,
        })

        for (const entry of entries) {
            if (entry.isDirectory()) {
                await processDirectory(
                    path.join(dirPath, entry.name),
                    path.join(baseSlug, entry.name)
                )
            } else if (entry.name.match(/\.mdx?$/)) {
                const slug = path.join(
                    baseSlug,
                    entry.name.replace(/\.mdx?$/, "")
                )

                const {meta, content} = await getPostBySlug(slug)
                const backslashUrl = slug.replace(/\\/g, '/');

                slugs.push({ slug })
                allFile.push({
                    title: meta.title || slug.split('\\')[0],
                    date: meta.date || new Date().toISOString(),
                    url: backslashUrl,
                    slug: backslashUrl,
                    slugs: slugs,
                    content: content
                })
            }
        }
    }
    await processDirectory(postsDirectory)

    allFile.sort((a: any, b: any) => compareDesc(new Date(a.date), new Date(b.date)))

    return allFile
}
