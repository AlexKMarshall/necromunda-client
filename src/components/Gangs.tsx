import { useCreateGang, useReadGangs, useReadGangById } from "../hooks/gang";
import { useReadFactions } from "../hooks/faction";
import { useReadFighterPrototypes } from "../hooks/fighter-prototype";
import { useState } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";
import { FighterInput } from "../schemas/fighter.schema";
import { FighterPrototype } from "../schemas/fighter-prototype.schema";
import { usePurchase } from "../hooks/purchase";

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

function getFighterPrototypeById(fps: FighterPrototype[], id: string) {
  return fps.find((fp) => fp._id === id);
}

export function GangDetail() {
  const { id } = useParams<RouteParams>();
  const { gang, isLoading } = useReadGangById(id);
  const {
    isLoading: isProtosLoading,
    fighterPrototypes,
  } = useReadFighterPrototypes({
    query: { faction: gang?.faction._id },
    config: { enabled: gang },
  });
  const [postPurchase] = usePurchase();

  const [basket, setBasket] = useState<FighterInput[]>([]);

  const addToBasket = (protoId: string): void => {
    setBasket((prevBasket) => [...prevBasket, { name: "", protoId }]);
  };

  const removeFromBasket = (fighter: FighterInput) => {
    setBasket((prevBasket) => prevBasket.filter((f) => f !== fighter));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const updateFighterName = (fighter: FighterInput, name: string) => {
    setBasket((prevBasket) => {
      const fighterIndex = prevBasket.findIndex((f) => f === fighter);
      return [
        ...prevBasket.slice(0, fighterIndex),
        { ...fighter, name },
        ...prevBasket.slice(fighterIndex + 1),
      ];
    });
  };

  const makePurchase: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!gang) return;

    await postPurchase({ gangId: gang._id, fighters: basket });
    clearBasket();
  };

  if (isLoading || isProtosLoading) return <div>Loading...</div>;
  if (!gang || !fighterPrototypes) return null;

  return (
    <>
      <h2>
        {gang.name} - {gang.faction.name}
      </h2>
      <h3>Members</h3>
      <ul>
        {gang.fighters.map((f) => (
          <li key={f._id}>
            {f.name} - {f.proto}
          </li>
        ))}
      </ul>
      <h3>Available for hire</h3>
      <ul>
        {fighterPrototypes.map((fp) => (
          <li key={fp._id}>
            {fp.name} - {fp.fighterClass}{" "}
            <button onClick={() => addToBasket(fp._id)}>Add to basket</button>
          </li>
        ))}
      </ul>
      <h2>Basket</h2>
      {basket.length > 0 ? (
        <div>
          <button onClick={clearBasket} type="reset">
            Clear basket
          </button>{" "}
          <button type="submit" onClick={makePurchase}>
            Make Purchase
          </button>
        </div>
      ) : null}
      <ul>
        {basket.map((fighter, index) => {
          const proto = getFighterPrototypeById(
            fighterPrototypes,
            fighter.protoId
          );
          return (
            <li key={index}>
              <label htmlFor={`name-${index}`}>Name:</label>{" "}
              <input
                id={`name-${index}`}
                value={fighter.name}
                onChange={(event) =>
                  updateFighterName(fighter, event.target.value)
                }
              />{" "}
              - {proto?.name} - {proto?.fighterClass}{" "}
              <button onClick={() => removeFromBasket(fighter)} type="button">
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
