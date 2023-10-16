import Link from "next/link";
import Image from "next/image";

import { getCharacter, getLocation } from "rickmortyapi";

async function getLocationData(id: string) {
  const res = await getLocation(parseInt(id));

  if (res.status !== 200) {
    throw new Error("Could not fetch location details please try again");
  }

  return res.data;
}

async function CharacterCard(props: { id?: string }) {
  if (!props?.id) {
    return <p>Could not fetch character details for the supplied id</p>;
  }
  const res = await getCharacter(parseInt(props?.id));

  if (res.status !== 200) {
    return <p>Error fetching character details for character {props.id}</p>;
  }

  const { data } = res;

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        {" "}
        <Image
          src={data.image}
          alt={`${data.name}'s photo`}
          height={100}
          width={100}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p>Status: {data.status}</p>
        <p>Species: {data.species}</p>
        <p>Type: {data.type}</p>
        <p>Gender: {data.gender}</p>
        <div className="card-actions justify-end">
          <Link href={`/character/${data.id}`} className="btn btn-primary">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}

// TODO: use suspense boundaries here for a cleaner UX
export default async function LocationDetails(props: {
  params: { id: string };
}) {
  if (!props.params?.id) {
    return <h1>Missing params yo</h1>;
  }

  const location = await getLocationData(props.params.id);

  return (
    <div>
      <p>here are the location details:</p>
      <p>Name: {location.name}</p>
      <p>Type: {location.type}</p>
      <p>Dimension: {location.dimension}</p>
      <p>Number of: residents:{location.residents.length}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {location.residents.map((url) => (
          <CharacterCard key={url} id={url?.split("/")?.at(-1)} />
        ))}
      </div>
    </div>
  );
}
