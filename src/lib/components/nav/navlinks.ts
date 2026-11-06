type Link = {
	path:
		| '/dashboard'
		| '/users'
		| '/feedbacks'
		| '/programs'
		| '/resources'
		| '/counterparties'
		| '/events';
	name: string;
};

export const navlinks: Link[] = [
	{
		path: '/dashboard',
		name: 'Dashboard'
	},
	{
		path: '/users',
		name: 'Users'
	},
	{
		path: '/feedbacks',
		name: 'Feedbacks'
	},
	{
		path: '/programs',
		name: 'Programs'
	},
	{
		path: '/resources',
		name: 'Resources'
	},
	{
		path: '/counterparties',
		name: 'Counterparties'
	},
	{
		path: '/events',
		name: 'Events'
	}
];
