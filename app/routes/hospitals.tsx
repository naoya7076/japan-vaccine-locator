import { Hospital } from "@/components/hospital";
import { json } from "@remix-run/cloudflare";
import { supabaseClient } from "@/lib/supabase";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const page = Number(url.searchParams.get("page")) || 0;
	const limit = 2;
	const response = new Response();
	const { data: hospitals } = await supabaseClient(request, response)
		.from("hospitals")
		.select("id, name, postal_code, address, vaccines(name)")
		.limit(limit)
		.range(page, page + limit - 1);

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
					vaccines={hospital.vaccines.map((vaccine) => vaccine.name)}
				/>
			))}
		</>
	);
};
export default Hospitals;
