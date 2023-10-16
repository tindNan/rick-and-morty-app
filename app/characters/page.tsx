import Image from "next/image";
import Link from "next/link";
import { getCharacters } from "rickmortyapi";

async function getAllCharacters() {
  const res = await getCharacters();

  if (res.status !== 200) {
    throw new Error("failed to fetch rick and morty data");
  }

  return res.data;
}

function CharacterCard({
  name,
  locationName,
  imageSrc,
  id,
}: {
  name: string;
  locationName: string;
  imageSrc: string;
  id: string | number;
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image src={imageSrc} alt={`${name}'s avatar`} height={150} width={150} />
      <div className="px-6 py-4">
        <p>{name}</p>
        <p>{locationName}</p>
      </div>
      <Link href={`characters/${id}`}>View more information</Link>
    </div>
  );
}

export default async function Stuff() {
  const characters = await getAllCharacters();
  const { info, results } = characters;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((r) => (
            <tr key={r.id}>
              <td>
                <Image
                  src={r.image}
                  alt={`${r.name}'s avatar`}
                  height={150}
                  width={150}
                />
              </td>
              <td>
                <Link href="">{r.location.name}</Link>
              </td>
              <td>
                <Link href={`/characters/${r.id}`} className="font-bold">
                  View more information
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
