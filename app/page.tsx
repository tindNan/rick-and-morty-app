import Link from "next/link";
import { getLocations } from "rickmortyapi";

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

export default async function Home({ searchParams }: SearchParams) {
  let page = 1;
  if (searchParams?.page) {
    const parsed = parseInt(searchParams.page);
    page = parsed <= 1 ? 1 : parsed;
  }
  const response = await getLocations({ page });

  if (response.status !== 200) {
    return (
      <div className="text-red">
        Error while fetching locations, please try again
      </div>
    );
  }

  const { results, info } = response.data;
  const previous = getPageNumber(info?.prev);
  const next = getPageNumber(info?.next);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number of residents</th>
              <th>Dimension</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results?.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.residents.length}</td>
                <td>{r.dimension}</td>
                <td>{r.type}</td>
                <td>
                  <Link href={`/location/${r.id}`} className="btn">
                    View more &rarr;{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
