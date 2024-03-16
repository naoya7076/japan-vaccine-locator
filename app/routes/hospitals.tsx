export default function Hospitals() {
    const hospitals = [
        {
          "name": "医療法人つとむ会 澤田内科医院",
          "address": "大阪府大阪市北区梅田１―２―２―２００",
          "phone_number": "06-6343-1414"
        },
        {
          "name": "医療法人渡辺医学会桜橋渡辺病院",
          "address": "大阪府大阪市北区梅田２―４―３２",
          "phone_number": "06-6341-8651"
        }
      ]
    return (
        <div>
            <h1>病院一覧</h1>
            <ul>
                {hospitals.map((hospital, index) => (
                    <li key={index}>
                        <h2>{hospital.name}</h2>
                        <p>住所: {hospital.address}</p>
                        <p>電話番号: {hospital.phone_number}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
