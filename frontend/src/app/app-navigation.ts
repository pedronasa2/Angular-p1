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
    text: 'Loja',
    icon: 'cart',

    items: [
      {
        text: 'Inicio',
        path: '/inicioloja',
        icon: "cart"
      },
      {
        text: 'Cliente',
        path: '/inicioloja/clientes',
        icon: "group"
      },
      {
        text: 'Produto',
        path: '/inicioloja/produto',
        icon: 'packagebox'
      },
      {
        text: 'Notas',
        path: '/inicioloja/nota',
        icon: 'calendardateendoutline'
      },
    ],
  },

];
