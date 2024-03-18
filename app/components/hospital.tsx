import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
type HospitalProps = {
	name: string;
	postal_code: string;
	address: string;
};
export const Hospital = (props: HospitalProps) => {
	return (
		<div className="container mx-auto mt-8 max-w-4xl">
			<Card>
				<CardHeader>
					<CardTitle>{props.name}</CardTitle>
				</CardHeader>
				<CardContent>
					<div>
						{/* <CardDescription>{props.address}</CardDescription> */}
						<div className="mt-4">
							<div className="flex justify-between">
								<div>
									<p className="text-sm">{props.postal_code}</p>
									<p className="font-medium">{props.address}</p>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
