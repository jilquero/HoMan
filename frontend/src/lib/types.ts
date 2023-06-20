export type User = {
	id: string;
	image: string;
	username: string;
	firstName: string | undefined;
	lastName: string | undefined;
	email: string;
	phone: string | undefined;
	contexts: Context[];
};

export type Warehouse = {
	id: string;
	name: string;
	description: string;
	contexts: Context[];
	products: Product[];
	history: WarehouseHistory[];
};

export type Context = {
	id: string;
	warehouseId: string;
	userId: string;
	roles: Role[];
	status: string;
};

export type Product = {
	id: string;
	image: string;
	name: string;
	description: string;
	barcode: string;
	tags: string[];
	quantity: number;
	minimumQuantity: number | null;
	preferredQuantity: number | null;
};

export type WarehouseHistory = {
	id: string;
	action: string;
	target: string;
	amount: number | null;
	user: string;
	date: string;
};

export type Role = {
	id: string;
	name: string;
	permissions: Permission[];
};

export type Permission = {
	id: string;
	name: string;
	description: string;
};
