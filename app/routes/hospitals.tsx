import { Hospital } from "@/components/hospital";
import { json } from "@remix-run/cloudflare";
import { supabaseClient } from "@/lib/supabase";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const response = new Response();
	const { data: hospitals } = await supabaseClient(request, response)
		.from("hospitals")
		.select("id, name, postal_code, address, vaccines(name)");

	return json(
		{ hospitals },
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
