const submenuIcon = 'icon-options-vertical';

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Suppliers',
      url: '/suppliers',
      icon: 'icon-star',
    },
    {
      name: 'Avails',
      url: '/avails',
      icon: 'icon-list',
    },
    {
      name: 'Options',
      icon: 'icon-equalizer',
      children: [

        {
          name: 'Ply Ratings',
          url: '/options/ply-ratings',
          icon: submenuIcon,
        },
        {
          name: 'Tire Brands',
          url: '/options/tire-brands',
          icon: submenuIcon,
        },
        {
          name: 'Tire Patterns',
          url: '/options/tire-patterns',
          icon: submenuIcon,
        },
        {
          name: 'Tire Sizes',
          url: '/options/tire-sizes',
          icon: submenuIcon,
        },
        {
          name: 'Tire Models',
          url: '/options/tire-models',
          icon: submenuIcon,
        },
        {
          name: 'TRA Codes',
          url: '/options/tra-codes',
          icon: submenuIcon,
        },
        {
          name: 'Rubber Compounds',
          url: '/options/rubber-compounds',
          icon: submenuIcon,
        },
      ],
    },
    {
      name: 'Admin',
      icon: 'icon-settings',
      role: 'admin',
      children: [
        {
          name: 'Users',
          url: '/admin/users',
          icon: submenuIcon,
        },

      ],
    },
  ]
};
