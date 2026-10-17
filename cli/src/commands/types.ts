export type Argument = {
	name: string;
	desc: string;
};
export type Option = {
	flags: string;
	desc: string;
	def?: string | string[] | boolean;
};
