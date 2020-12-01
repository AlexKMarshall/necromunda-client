import { useState } from "react";
import { useCreateFaction, useReadFactions } from "../hooks/faction";

export default function Factions() {
  const [isSaving, setIsSaving] = useState(false);
  const { isLoading, isError, error, factions } = useReadFactions();
  const [postFaction] = useCreateFaction();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
    };
    const name = target.name.value;
    setIsSaving(true);
    await postFaction({ name });
    setIsSaving(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!factions) return null;

  return (
    <>
      <div>Faction List</div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="faction-name">Faction Name</label>
        <input type="text" id="faction-name" name="name" />
        <button disabled={isSaving}>Submit</button>
      </form>
      <ul>
        {factions.map((f) => (
          <li key={f._id}>{f.name}</li>
        ))}
      </ul>
    </>
  );
}
