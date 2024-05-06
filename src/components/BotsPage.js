import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots] = useState([]);
  const [botsArmy, setBotsArmy] = useState([]);
  const [BotSpecs, setBotSpecs] = useState({});
  const [collectionVisible, setCollectionVisible] = useState(true);
  const [filteredCollection, setFilteredCollection] = useState([]);
  const [botCollection, setBotCollection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8002/bots")
      .then((res) => res.json())
      .then((bots) => {
        setBotCollection(bots);
        setFilteredCollection(bots);
        setBots(bots);
      });
  }, []);
  function addToArmy(bot) {
    if (botsArmy.includes(bot)) {
      console.log("bot already added");
    } else {
      setBotsArmy([...botsArmy, bot]);
    }
  }

  function deleteFromArmy(bot) {
    const newArmy = botsArmy.filter((card) => card.id !== bot.id);

    setBotsArmy(newArmy);
  }

  function removeBotPermanently(bot) {
    const newCollection = botCollection.filter((card) => card !== bot);
    const newFilteredCollection = filteredCollection.filter(
      (card) => card !== bot
    );
    const newArmy = botsArmy.filter((card) => card !== bot);

    setBotCollection(newCollection);
    setFilteredCollection(newFilteredCollection);
    setBotsArmy(newArmy);

    fetch(`http://localhost:8002/bots/${bot.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  }

  function displayBotSpecs(bot) {
    setCollectionVisible(false);
    setBotSpecs(bot);
  }

  function displayBotCollection() {
    setCollectionVisible(true);
    // setBotSpecs(null);
  }

  return (
    <div>
      <YourBotArmy
        bots={botsArmy}
        action={deleteFromArmy}
        removeBotPermanently={removeBotPermanently}
      />

      {collectionVisible ? (
        <BotCollection
          bots={bots}
          setBotsArmy={addToArmy}
          // botCollection={filteredCollection}
          action={displayBotSpecs}
          removeBotPermanently={removeBotPermanently}
        />
      ) : (
        <BotSpecs
          bot={BotSpecs}
          back={displayBotCollection}
          enlist={addToArmy}
        />
      )}
    </div>
  );
}

export default BotsPage;
