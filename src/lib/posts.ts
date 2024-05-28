import { promises as fsPromises } from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"

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
    const mdxSource = await serialize(content)

    return {
        meta: data,
        content: mdxSource,
    }
}

/**
 * @description 获取指定路径下所有文件名
 * @return slugs 所有后缀.mdx, .md件名的集合
 */
export async function getAllPosts() {
    const slugs: Array<string | object> = []

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
            } else {
                const slug = path.join(
                    baseSlug,
                    entry.name.replace(/\.mdx?$/, "")
                )
                slugs.push({ slug })
            }
        }
    }
    await processDirectory(postsDirectory)

    return slugs
}
