import { Icons } from "@/components/shared/icons"

export const footerLinks = [
    {
        id: 1,
        name: 'WhitePaper',
        href: '/whitepaper'
    },
    {
        id: 2,
        name: 'ChangeLog',
        href: '/whitepaper'
    },
    {
        id: 3,
        name: 'Twitter',
        href: '/whitepaper'
    },
    {
        id: 4,
        name: 'Telegram',
        href: '/whitepaper'
    },
    {
        id: 41,
        name: 'Terms of Service',
        href: '/whitepaper'
    },
]


export const dashboardLinks = [
    // {
    //     id: 1,
    //     href: '/',
    //     icon: Icons.runnerIcon ,
    //     title: 'Dashboard'
    // },
    {
        id: 2,
        href: '/runner',
        icon: Icons.runnerIcon ,
       

        title: 'Runner Reports'
    },
    {
        id: 3,
        href: '/twitter',
        icon: Icons.twitterIcon,

        title: 'Twitter Targets'
    },
    {
        id: 4,
        href: '/social-sniper',
        icon: Icons.sniperIcon ,
        

        title: 'Social Sniper'
    },
    {
        id: 5,
        href: '/settings',
        icon: Icons.settingsIcon ,
        

        title: 'Settings'
    },
]

export const stats = [
  { id: 1, stat: 100000, title: 'Realized Profits' },
  { id: 2, stat: 108000, title: 'Pending Profits' },
  { id: 3, stat: 104000, title: 'Total Profits' },
];

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export const colorThemes = [
  {
    color: "#1DA1F2", // ← use plain color value
    gradient: "linear-gradient(135deg, rgba(29, 161, 242, 0.2) 0%, rgba(29, 161, 242, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Twitter Blue"
  },
  {
    color: "#FF9500",
    gradient: "linear-gradient(135deg, rgba(255, 149, 0, 0.2) 0%, rgba(255, 149, 0, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Orange"
  },
  {
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(124, 58, 237, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Purple"
  },
  {
    color: "#4F46E5",
    gradient: "linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(79, 70, 229, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Indigo"
  },
  {
    color: "#e05c14",
    gradient: "linear-gradient(135deg, rgba(224, 92, 20, 0.2) 0%, rgba(224, 92, 20, 0.05) 50%, rgba(5, 18, 26, 0.6) 100%)",
    name: "Brand Orange"
  },
];

