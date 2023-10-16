import Image from "next/image";
import Link from "next/link";
import { getCharacters } from "rickmortyapi";

type SearchParams = {
  searchParams?: {
    page: string;
  };
};

function getPageNumber(url: string | null | undefined) {
  if (!url) return null;

  const [, pagePart] = url.split("?");
  const [, pageAsString] = pagePart.split("=");

  return parseInt(pageAsString);
}

export default async function Characters({ searchParams }: SearchParams) {
  let page = 1;
  if (searchParams?.page) {
    const parsed = parseInt(searchParams.page);
    page = parsed <= 1 ? 1 : parsed;
  }

  const response = await getCharacters({ page });

  if (response.status !== 200) {
    return (
      <div className="text-red">
        Error while fetching locations, please try again
      </div>
    );
  }

  const { info, results } = response.data
  const previous = getPageNumber(info?.prev);
  const next = getPageNumber(info?.next);

  return (
    <div className="overflow-x-auto">
      <table className="table">
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
                <Link href={`/characters/${r.id}`} className="btn">
                  View more information &rarr;
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end gap-4">
        {previous ? (
          <Link href={`/?page=${previous}`} className="btn btn-outline">
            Previous
          </Link>
        ) : null}
        {next ? (
          <Link href={`/?page=${next}`} className="btn btn-outline">
            Next
          </Link>
        ) : null}
      </div>
    </div>
  );
}
