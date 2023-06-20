// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: {
			id: string;
			email: string;
			username: string;
			firstName: string;
			lastName: string;
			image: string;
			phone: string;
			contexts: {
				id: string;
				status: string;
				warehouseId: string;
				userId: string;
			}[];
		};
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

// import { SupabaseClient, Session } from '@supabase/supabase-js';

// declare global {
// 	namespace App {
// 		interface Locals {
// 			supabase: SupabaseClient;
// 			getSession(): Promise<Session | null>;
// 		}
// 		interface PageData {
// 			session: Session | null;
// 		}
// 		// interface Error {}
// 		// interface Platform {}
// 	}
// }
