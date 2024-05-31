export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "resume",
    description: "Beautifully resume built with Rose UI and Tailwind CSS.",
    mainNav: [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "blog",
            href: "/blog",
        },
        {
            title: "Project",
            href: "/project",
        },
        {
            title: "Contacts",
            href: "/contacts",
        },
    ],
    links: {
        twitter: "https://github.com/Alicehhhmm/resume",
        github: "https://github.com/Alicehhhmm/resume",
        docs: "https://github.com/Alicehhhmm/resume",
    },
}
