
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
        path: "/admin/courses",
        title: "Courses",
        permission: "admin",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        path: "/admin/rewards",
        title: "Rewards",
        permission: "admin",
        // icon: <HelpCenter />
    },
    { // single item
        type: "item",
        title: 'Attributes',
        path: '/admin/attributes',
        permission: 'admin',
    },
    { // single item
        type: "item",
        path: "/roadmap",
        title: "roadmap",
        permission: "admin",
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