type FooterLink = {
  linkTitle: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

export type FooterList = FooterSection[];

export const FOOTER_LIST: FooterList = [
  {
    title: 'Services',
    links: [
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
      {
        linkTitle: '********',
        href: '/help',
      },
    ],
  },
];
