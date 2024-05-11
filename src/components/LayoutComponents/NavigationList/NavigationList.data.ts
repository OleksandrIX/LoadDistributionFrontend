type NavigationItem = {
    to: string;
    content: string;
};

const navigationList: NavigationItem[] = [
    { to: "/regulations", content: "Положення" },
    { to: "/departments", content: "Кафедри" },
    { to: "/contacts", content: "Контакти" }
];

export { navigationList };
