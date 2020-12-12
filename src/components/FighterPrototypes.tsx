import { useState } from "react";
import {
  useCreateFighterPrototype,
  useReadFighterPrototypes,
} from "../hooks/fighter-prototype";
import { fighterClasses } from "../schemas/fighter-prototype.schema";
import { useReadFactions } from "../hooks/faction";

export default function Factions() {
  const {
    isLoading,
    isError,
    error,
    fighterPrototypes,
  } = useReadFighterPrototypes();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!fighterPrototypes) return null;

  return (
    <>
      <div>Fighter Prototype List</div>
      <CreateFighterPrototype />
      <ul>
        {fighterPrototypes.map((f) => (
          <li key={f._id}>
            {f.name} - {f.fighterClass} - {f.faction.name}
          </li>
        ))}
      </ul>
    </>
  );
}

function CreateFighterPrototype() {
  const [isSaving, setIsSaving] = useState(false);
  const { isLoading, factions } = useReadFactions();
  const [postFighterPrototype] = useCreateFighterPrototype();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      "fighter-class": { value: string };
      faction: { value: string };
    };
    const fighterPrototype = {
      name: target.name.value,
      fighterClass: target["fighter-class"].value,
      faction: target.faction.value,
    };
    setIsSaving(true);
    await postFighterPrototype(fighterPrototype);
    setIsSaving(false);
    target.name.value = "";
    target["fighter-class"].value = "";
    target.faction.value = "";
  };

  if (isLoading) return <div>"Loading..."</div>;
  if (!factions) return null;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Fighter Prototype Name:</label>
      <input type="text" id="name" name="name" />
      <label htmlFor="class">Select Fighter class:</label>
      <select name="fighter-class" id="fighter-class" required={true}>
        <option key="" value="" disabled={true}>
          Please select
        </option>
        {fighterClasses.map((fighterClass) => (
          <option key={fighterClass} value={fighterClass}>
            {fighterClass}
          </option>
        ))}
      </select>
      <label htmlFor="faction">Select faction:</label>
      <select name="faction" id="faction" required={true}>
        <option key="" value="" disabled={true}>
          Please select
        </option>
        {factions.map((f) => (
          <option key={f._id} value={f._id}>
            {f.name}
          </option>
        ))}
      </select>
      <button disabled={isSaving}>Submit</button>
    </form>
  );
}
