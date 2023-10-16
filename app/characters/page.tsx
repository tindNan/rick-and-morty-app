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

export default async function Characters() {
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
                <div className="mask mask-squircle h-24 w-24">
                  <Image
                    src={r.image}
                    alt={`${r.name}'s avatar`}
                    height={96}
                    width={96}
                  />
                </div>
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
