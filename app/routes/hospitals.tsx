import { Hospital } from "@/components/hospital";
const Hospitals = () => {
	const hospitals = [
		{
			id: 1,
			name: "医療法人つとむ会 澤田内科医院",
			postal_code: "530-0001",
			address: "大阪府大阪市北区梅田１―２―２―２００",
		},
		{
			id: 2,
			name: "医療法人渡辺医学会桜橋渡辺病院",
			postal_code: "530-0001",
			address: "大阪府大阪市北区梅田２―４―３２",
		},
	];
	return (
		<>
			{hospitals.map((hospital) => (
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
