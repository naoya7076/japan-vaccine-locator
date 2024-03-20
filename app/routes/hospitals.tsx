import { Hospital } from "@/components/hospital";
import { json } from "@remix-run/cloudflare";
import { supabaseClient } from "@/lib/supabase";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { PaginationWrapper } from "@/components/pagination-wrapper";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1");
	const itemsPerPage = 2;
	const start = (page - 1) * itemsPerPage;
	const response = new Response();
	const { data: hospitals } = await supabaseClient(request, response)
		.from("hospitals")
		.select("id, name, postal_code, address, vaccines(name)")
		.range(start, start + itemsPerPage - 1);

	return json(
		{ hospitals, page },
		{
			headers: response.headers,
		},
	);
};
const Hospitals = () => {
	const { hospitals, page } = useLoaderData<typeof loader>();
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
			<PaginationWrapper page={page} />
		</>
	);
};
export default Hospitals;
