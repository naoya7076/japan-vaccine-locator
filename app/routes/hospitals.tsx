import { Hospital } from "@/components/hospital";
import { json } from "@remix-run/cloudflare";
import { createServerClient } from "@supabase/auth-helpers-remix";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response();
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
	if (!supabaseUrl || !supabaseAnonKey) {
		throw new Error("Supabase URL or Supabase Anon Key is missing.");
	}
	const supabaseClient = createServerClient(supabaseUrl, supabaseAnonKey, {
		request,
		response,
	});

	const { data } = await supabaseClient.from("hospitals").select("*");
	return json(
		{ hospitals: data },
		{
			headers: response.headers,
		},
	);
};
const Hospitals = () => {
	const { hospitals } = useLoaderData<typeof loader>();
	return (
		<>
			{hospitals?.map((hospital) => (
				<Hospital
					key={hospital.id}
					name={hospital.name}
					postal_code={hospital.postal_code}
					address={hospital.address}
				/>
			))}
		</>
	);
};
export default Hospitals;
