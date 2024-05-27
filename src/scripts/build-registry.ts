/**
 * @description 读取md文档核心方法
 * @stepDescription: 大概思路
 * ----------------------------------------------------------------
 * | step1: 读取所有文章所在的文件夹
 * | step2: 读取指定文件（以 .md ）结尾的文件
 * | step3: 读取交互组件（UI）
 * | step4: 文章字体、颜色
 * | step5: 渲染到指定页面
 * ----------------------------------------------------------------
 */

// @sts-nocheck
import { existsSync, promises as fs, readdirSync, readFileSync } from "fs"
import path from "node:path"
import matter from "gray-matter"

const ROOT_POST_PATH = path && path.join(process.cwd(), "docs")

export async function analysePostsFile(dir: string) {
    const filePath = path.join(ROOT_POST_PATH, dir, "/index.md")
    const fileContent = readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)
    // console.log("文件内容@1", fileContent)
    // console.log("文件内容@matter", matter(fileContent))
    // console.log("文件内容@data", data)
    return {
        meta: {
            ...data,
        },
        content: content,
    }
}

export async function fetchPostsMap() {
    const dirs = readdirSync(ROOT_POST_PATH, { withFileTypes: true })
        .filter((f) => f.isDirectory())
        .map((f) => f.name)

    const fileDetail = await Promise.all(
        dirs.map(async (dir) => {
            const postDetail = await analysePostsFile(dir)
            return {
                ...postDetail,
            }
        })
    )

    // 按时间先后顺序排列
    // fileDetail.sort((a, b) => {
    //     return +new Date(b.date) - +new Date(a.date)
    // })
    console.log("文件内容数组", fileDetail)

    return fileDetail
}

export async function createRegistry() {
    const posts = await fetchPostsMap()
    if (!posts) throw new Error("not found")
    return posts
}
