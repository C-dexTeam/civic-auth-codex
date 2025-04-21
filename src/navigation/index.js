
/*
    @data structure
    {
        type: "item" | "category" | "divider",
        path: string,
        title: string,
        role: "user" | "admin",
        icon: ReactNode,
        children: array(item)
    }
*/

const navigation = [
    { // single item
        type: "item",
        path: "/courses",
        title: "courses",
        permission: "courses",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        path: "/roadmap",
        title: "roadmap",
        permission: "roadmap",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        path: "/courses/solana",
        title: "solana",
        permission: "solana",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        path: "/build",
        title: "build",
        permission: "build",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        path: "/community",
        title: "community",
        permission: "community",
        // icon: <HelpCenter />
    },
    // { // item with children
    //     type: "item",
    //     title: "Team",
    //     permission: "team",
    //     icon: <Groups3Icon />,
    //     children: [
    //         {
    //             type: "item",
    //             path: "/team/members",
    //             title: "Members",
    //             permission: "team-members",
    //             icon: <People />,
    //         },
    //         {
    //             type: "item",
    //             path: "/team/settings",
    //             title: "Settings",
    //             role: "admin",
    //             permission: "team-settings",
    //             icon: <Settings />
    //         }
    //     ]
    // },
]

export default navigation;