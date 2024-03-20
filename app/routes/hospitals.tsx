import { useEffect, useState } from "react";
import { Hospital } from "@/components/hospital";
import { json } from "@remix-run/cloudflare";
import { supabaseClient } from "@/lib/supabase";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useMatches } from "@remix-run/react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const url = new URL(request.url);
	const page = parseInt(url.searchParams.get("page") || "1");
	const limit = 2;
	const response = new Response();
	const { data: hospitals } = await supabaseClient(request, response)
		.from("hospitals")
		.select("id, name, postal_code, address, vaccines(name)")
		.limit(limit)
		.range(page, page + limit - 1);

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
			<Pagination className="my-5">
				<PaginationContent>
					{page > 1 && (
						<>
							<PaginationItem>
								<PaginationPrevious to={`/hospitals/?page=${page - 1}`} />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink to={`/hospitals/?page=${page - 1}`}>
									{page - 1}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					<PaginationItem>
						<PaginationLink isActive to={`/hospitals/?page=${page}`}>
							{page}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink to={`/hospitals/?page=${page + 1}`}>
							{page + 1}
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext to={`/hospitals/?page=${page + 1}`} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</>
	);
};
export default Hospitals;
