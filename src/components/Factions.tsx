import { useAuthClient } from "../hooks/client";
import { useQuery } from "react-query";

export default function Factions() {
  const client = useAuthClient();
  const { isLoading, isError, error, data: factions } = useQuery(
    "factions",
    () => client("factions")
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;

  return (
    <>
      <div>Faction List</div>
      <ul>
        {Array.isArray(factions)
          ? factions.map((f: any) => <li key={f._id}>{f.name}</li>)
          : null}
      </ul>
    </>
  );
}
