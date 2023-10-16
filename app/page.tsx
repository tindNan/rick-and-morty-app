import Link from "next/link";
import { getLocations } from "rickmortyapi";

export default async function Home() {
  const response = await getLocations();

  if (response.status !== 200) {
    return (
      <div className="text-red">
        Error while fetching locations, please try again
      </div>
    );
  }

  const { results } = response.data;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          {/* head */}
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
                <td><Link href={`/location/${r.id}`}>View more </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-4">
        <button className="btn btn-outline">Previous page</button>
        <button className="btn btn-outline">Next</button>
      </div>
    </div>
  );
}
