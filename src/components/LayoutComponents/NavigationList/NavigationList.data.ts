type NavigationItem = {
    to: string;
    content: string;
};

const navigationList: NavigationItem[] = [
    { to: "/about", content: "Про сайт" },
    { to: "/regulations", content: "Положення" },
    { to: "/departments", content: "Кафедри" },
    { to: "/contacts", content: "Контакти" }
];

export { navigationList };
