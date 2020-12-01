import { useEffect, useState } from "react";
import { useAuthClient } from "../hooks/client";

export default function Factions() {
  const client = useAuthClient();
  const [factions, setFactions] = useState<any[]>([]);

  useEffect(() => {
    const getFactions = async () => {
      try {
        const data = await client("factions");
        setFactions(data);
      } catch (e) {
        console.error(e);
      }
    };
    getFactions();
  }, [client]);

  return (
    <>
      <div>Faction List</div>
      <ul>
        {factions.map((f) => (
          <li key={f._id}>{f.name}</li>
        ))}
      </ul>
    </>
  );
}
