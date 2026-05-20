type NavigationItem = { path?: string; text: string; icon?: string; items?: NavigationItem[] };
export const navigation: NavigationItem[] = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home',
  },
  {
    text: 'Agenda',
    path: '/agenda',
    icon: 'cell.svg',
  },
  {
    text: 'Cidades',
    path: '/cidades',
    icon: 'city.svg',
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile',
      },
      {
        text: 'Tasks',
        path: '/tasks',
      },
    ],
  },
];
