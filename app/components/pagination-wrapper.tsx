import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export const PaginationWrapper = ({ page }: { page: number }) => (
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
);
