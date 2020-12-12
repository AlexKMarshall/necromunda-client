import { useCreateGang, useReadGangs, useReadGangById } from "../hooks/gang";
import { useReadFactions } from "../hooks/faction";
import { useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";

export function Gangs() {
  const { isLoading, isError, error, gangs } = useReadGangs();
  const { url } = useRouteMatch();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{JSON.stringify(error)}</div>;
  if (!gangs) return null;

  return (
    <>
      <div>Gang List</div>
      <CreateGang />
      <ul>
        {gangs.map((g) => (
          <li key={g._id}>
            <Link to={`${url}/${g._id}`}>
              {g.name} - {g.faction.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function CreateGang() {
  const [isSaving, setIsSaving] = useState(false);
  const { isLoading, factions } = useReadFactions();
  const [postGang] = useCreateGang();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      name: { value: string };
      faction: { value: string };
    };
    const gang = { name: target.name.value, faction: target.faction.value };
    setIsSaving(true);
    await postGang(gang);
    setIsSaving(false);
    target.name.value = "";
    target.faction.value = "";
  };

  if (isLoading) return <div>"Loading..."</div>;
  if (!factions) return null;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Gang Name:</label>
      <input type="text" id="name" name="name" />
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

interface RouteParams {
  id: string;
}

export function GangDetail() {
  const { id } = useParams<RouteParams>();
  const { gang, isLoading } = useReadGangById(id);

  if (isLoading) return <div>Loading...</div>;
  if (!gang) return null;

  return (
    <h2>
      {gang.name} - {gang.faction.name}
    </h2>
  );
}
