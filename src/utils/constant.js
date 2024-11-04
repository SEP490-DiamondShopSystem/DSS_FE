import {faHeadphones, faRefresh, faTag, faTruck} from '@fortawesome/free-solid-svg-icons';
import basic_diamond from '../assets/Diamond_Basics.png';
import earrings from '../assets/Earrings.png';
import necklaces from '../assets/Necklaces.png';
import rings from '../assets/Rings.png';
import diamond from '../assets/img-diamond.png';
import banner_1 from '../assets/diamond-jewelry.png';
import banner_2 from '../assets/Diamond_rings.png';
import banner_3 from '../assets/Lab_Grown_Diamonds.png';
import jewelry from '../assets/jewelry.png';

export const jewelries = [
	{logo: basic_diamond, title: 'Diamond Basics', link: '/jewelry-model/search'},
	{logo: necklaces, title: 'Dây chuyền', link: '/jewelry/design-your-own-necklaces'},
	{logo: earrings, title: 'Bông tai', link: '/jewelry/design-your-own-earrings'},
	// { logo: basic_diamond, title: "Bracelets" },
	{logo: rings, title: 'Nhẫn', link: '/jewelry/design-your-own-rings'},
];

export const list = [
	{
		icon: faTruck,
		title: 'Giao hàng theo tỉnh/thành',
		subtitle: 'Đơn hàng từ tất cả các mặt hàng',
	},
	{
		icon: faRefresh,
		title: 'Hoàn Tiền',
		subtitle: 'Đảm bảo hoàn lại tiền',
	},
	{
		icon: faTag,
		title: 'Giảm giá',
		subtitle: 'Cho mọi đơn hàng giảm trên 20%',
	},
	{
		icon: faHeadphones,
		title: 'Hỗ Trợ 24/7',
		subtitle: 'Liên hệ với chúng tôi 24/7',
	},
];

export const Shape = [
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

export const marks = {
	1: 'K',
	2: 'J',
	3: 'I',
	4: 'H',
	5: 'G',
	6: 'F',
	7: 'E',
	8: 'D',
};
export const marksCut = {
	1: 'Good',
	2: 'Very Good',
	3: 'Excelent',
};
export const marksClarity = {
	1: 'SI2',
	2: 'SI1',
	3: 'VS2',
	4: 'VS1',
	5: 'VVS2',
	6: 'VVS1',
	7: 'IF',
	8: 'FL',
};

export const listBanner = [{img: banner_1}, {img: banner_2}, {img: banner_3}];

export const genderChoice = ['Nam', 'Nữ'];

export const typeChoice = ['Nhẫn', 'Bông tai', 'Dây chuyền'];

export const metalChoice = ['White Gold', 'Yellow Gold', 'Platinum'];

export const data = {
	Id: '01809474-69c3-4309-8360-d6eff09d04fc',
	ModelId: '312fd06e-46b0-452b-945b-72f71acd505c',
	Model: {
		Id: '312fd06e-46b0-452b-945b-72f71acd505c',
		Name: 'Test_Ring_No_Diamond',
		CategoryId: '43e5084c-5453-45f2-ad0d-23e66251d348',
		Category: null,
		Width: 10,
		Length: null,
		IsEngravable: true,
		IsRhodiumFinish: true,
		BackType: null,
		ClaspType: null,
		ChainType: null,
		MainDiamonds: null,
		SideDiamonds: null,
		SizeMetals: null,
	},
	SizeId: '3',
	Size: null,
	MetalId: '1',
	Metal: [
		{
			Id: '1',
			Name: 'Platinum',
			Price: 778370,
		},
	],
	Weight: 10,
	SerialCode: 'MODEL_TEST_NO_DIAMOND_2',
	IsAwaiting: false,
	IsSold: false,
	ShippingDate: '0001-01-01T00:00:00',
	Diamonds: [],
	SideDiamonds: [],
	ReviewId: null,
	Review: null,
	Thumbnail: null,
	Name: 'P - Test_Ring_No_Diamond',
	Price: 7783700,
	IsPreset: true,
};

export const enums = {
	BlobDirectoryType: {
		Public: 0,
		PaidContent: 1,
		Private: 2,
	},
	DeliveryFeeType: {
		Distance: 1,
		LocationToCity: 2,
	},
	WarrantyStatus: {
		Active: 0,
		Expired: 1,
		Cancelled: 2,
	},
	WarrantyType: {
		Diamond: 1,
		Jewelry: 2,
	},
	TransactionType: {
		Pay: 1,
		Refund: 3,
		Partial_Refund: 4,
	},
	DiamondOrigin: {
		Natural: 1,
		Lab: 2,
		Both: 3,
	},
	Operator: {
		Equal_Or_Larger: 1,
		Larger: 2,
	},
	RedemptionMode: {
		Single: 1,
		Multiple: 2,
	},
	Status: {
		Scheduled: 1,
		Active: 2,
		Expired: 3,
		Paused: 4,
		Cancelled: 5,
	},
	TargetType: {
		Jewelry_Model: 1,
		Diamond: 2,
		Order: 3,
	},
	UnitType: {
		Percent: 1,
		Fix_Price: 2,
		Free_Gift: 3,
	},
	DeliveryPackageStatus: {
		Preparing: 1,
		Delivering: 2,
		Complete: 3,
		Cancelled: 4,
	},
	OrderItemStatus: {
		Preparing: 0,
		Done: 1,
		Removed: 2,
	},
	OrderStatus: {
		Pending: 0,
		Processing: 1,
		Rejected: 2,
		Cancelled: 3,
		Prepared: 4,
		Delivering: 5,
		Delivery_Failed: 6,
		Success: 7,
		Refused: 8,
	},
	PaymentStatus: {
		PaidAll: 1,
		Deposited: 2,
		Refunding: 3,
		Refunded: 4,
		Pending: 5,
	},
	PaymentType: {
		Payall: 1,
		COD: 2,
	},
	PriorityLevel: {
		Low: 0,
		Medium: 1,
		High: 2,
	},
	BackType: {
		Push_Back: 0,
		Screw_Back: 1,
		Secure_Lock_Back: 2,
	},
	ChainType: {
		Cable: 0,
		Rope: 1,
		Bead: 2,
		Byzantine: 3,
		Figaro: 4,
		Curb: 5,
	},
	ClaspType: {
		Spring_Ring: 0,
		Lobster_Claw: 1,
		Bayonet: 2,
		Barrel: 3,
		Open_Box: 4,
		Toggle: 5,
		S_Hook: 6,
		Magnetic: 7,
		Pearl: 8,
		Bracelet_Catch: 9,
	},
	SettingType: {
		Prong: 0,
		Bezel: 1,
		Tension: 2,
		Pave: 3,
		Bar: 4,
		Flush: 5,
	},
	Clarity: {
		S12: 1,
		S11: 2,
		VS2: 3,
		VS1: 4,
		VVS2: 5,
		VVS1: 6,
		IF: 7,
		FL: 8,
	},
	Color: {
		K: 1,
		J: 2,
		I: 3,
		H: 4,
		G: 5,
		F: 6,
		E: 7,
		D: 8,
	},
	Culet: {
		None: 1,
		Very_Small: 2,
		Small: 3,
		Medium: 4,
		Slightly_Large: 5,
		Large: 6,
		Very_Large: 7,
		Extremely_Large: 8,
	},
	Cut: {
		Good: 1,
		Very_Good: 2,
		Ideal: 3,
		Astor_Ideal: 4,
	},
	Fluorescence: {
		None: 1,
		Faint: 2,
		Medium: 3,
		Strong: 4,
	},
	Girdle: {
		Extremely_Thin: 1,
		Very_Thin: 2,
		Thin: 3,
		Medium: 4,
		Slightly_Thick: 5,
		Thick: 6,
		Very_Thick: 7,
		Extremely_Thick: 8,
	},
	Polish: {
		Poor: 1,
		Fair: 2,
		Good: 3,
		Very_Good: 4,
		Excellent: 5,
	},
	Symmetry: {
		Poor: 1,
		Fair: 2,
		Good: 3,
		Very_Good: 4,
		Excellent: 5,
	},
	DeliveryMethod: {
		Train: 0,
		Car: 1,
		Plane: 2,
	},
	CustomizeDiamondRequestStatus: {
		Accepted: 1,
		Rejected: 2,
		Invalid: 3,
		Finish: 4,
	},
	AccountRoleType: {
		Customer: 0,
		Staff: 1,
		None: -1,
	},
};

export const enumMappings = {
	DiamondOrigin: {1: 'Natural', 2: 'Lab', 3: 'Both'},
	Operator: {1: 'Equal or Larger', 2: 'Larger'},
	PriorityLevel: {0: 'Low', 1: 'Medium', 2: 'High'},
	BackType: {0: 'Push Back', 1: 'Screw Back', 2: 'Secure Lock Back'},
	ChainType: {0: 'Cable', 1: 'Rope', 2: 'Bead', 3: 'Byzantine', 4: 'Figaro', 5: 'Curb'},
	ClaspType: {
		0: 'Spring Ring',
		1: 'Lobster Claw',
		2: 'Bayonet',
		3: 'Barrel',
		4: 'Open Box',
		5: 'Toggle',
		6: 'S Hook',
		7: 'Magnetic',
		8: 'Pearl',
		9: 'Bracelet Catch',
	},
	SettingType: {0: 'Prong', 1: 'Bezel', 2: 'Tension', 3: 'Pave', 4: 'Bar', 5: 'Flush'},
	Clarity: {1: 'S12', 2: 'S11', 3: 'VS2', 4: 'VS1', 5: 'VVS2', 6: 'VVS1', 7: 'IF', 8: 'FL'},
	Color: {1: 'K', 2: 'J', 3: 'I', 4: 'H', 5: 'G', 6: 'F', 7: 'E', 8: 'D'},
	Culet: {
		1: 'None',
		2: 'Very Small',
		3: 'Small',
		4: 'Medium',
		5: 'Slightly Large',
		6: 'Large',
		7: 'Very Large',
		8: 'Extremely Large',
	},
	Cut: {1: 'Good', 2: 'Very Good', 3: 'Excellent', 4: 'No Cut'},
	Fluorescence: {1: 'None', 2: 'Faint', 3: 'Medium', 4: 'Strong'},
	Girdle: {
		1: 'Extremely Thin',
		2: 'Very Thin',
		3: 'Thin',
		4: 'Medium',
		5: 'Slightly Thick',
		6: 'Thick',
		7: 'Very Thick',
		8: 'Extremely Thick',
	},
	Polish: {1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent'},
	Symmetry: {1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent'},
};
