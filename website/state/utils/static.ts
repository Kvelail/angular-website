import { NavigationModel } from '../../state/model/navigation.model';

export const NAVBAR_MENU_ITEMS: NavigationModel[] = [
    {
        title: 'Features',
        iconSrc: 'assets/svg/website/arrow-down.svg',
        route: '/website/features',
    },
    {
        title: 'Pricing',
        route: '/website/pricing',
    },
    {
        title: 'Support',
        route: '/website/support',
    },
    {
        title: 'Login',
    },
    {
        title: 'Start Trial',
    },
];
