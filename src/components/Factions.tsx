import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Factions() {
  const { getAccessTokenSilently } = useAuth0();
  const [factions, setFactions] = useState<any[]>([]);

  useEffect(() => {
    const getFactions = async () => {
      try {
        const accessToken = await getAccessTokenSilently();

        const url = "http://localhost:8000/api/factions";

        const response = await window.fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setFactions(data);
      } catch (e) {
        console.error(e);
      }
    };
    getFactions();
  }, [getAccessTokenSilently]);

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
