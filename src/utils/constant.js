import {faHeadphones, faRefresh, faTag, faTruck} from '@fortawesome/free-solid-svg-icons';
import basic_diamond from '../assets/Diamond_Basics.png';
import earrings from '../assets/Earrings.png';
import necklaces from '../assets/Necklaces.png';
import rings from '../assets/Rings.png';

export const jewelries = [
	{logo: basic_diamond, title: 'Diamond Basics', link: '/jewelry/diamond-jewelry'},
	{logo: necklaces, title: 'Necklaces', link: '/jewelry/necklaces'},
	{logo: earrings, title: 'Earrings', link: '/jewelry/earrings'},
	// { logo: basic_diamond, title: "Bracelets" },
	{logo: rings, title: 'Rings', link: '/jewelry/rings'},
];

export const list = [
	{
		icon: faTruck,
		title: 'Free Delivery',
		subtitle: 'Orders from all item',
	},
	{
		icon: faRefresh,
		title: 'Return & Refund',
		subtitle: 'Money back guarantee',
	},
	{
		icon: faTag,
		title: 'Discount',
		subtitle: 'On every order over 40%',
	},
	{
		icon: faHeadphones,
		title: 'Support 24/7',
		subtitle: 'Contact us 24 hours a day',
	},
];

export const shape = [
	'Round',
	'Princess',
	'Cushion',
	'Oval',
	'Emerald',
	'Pear',
	'Asscher',
	'Heart',
	'Radiant',
	'Marquise',
];

export const metalJewelry = ['White Gold', 'Yellow Gold', 'Platinum'];
