import React, { useEffect, useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";
// import BotSpecs from "./BotSpecs";

function BotsPage() {
  //start here with your code for step one
  // const [bots, setBots] = useState([]);
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
      });
  }, []);
  function addToArmy(bot) {
    const newCollection = filteredCollection.filter(
      (card) => card.bot_class !== bot.bot_class
    );
    setFilteredCollection(newCollection);
    setBotsArmy([...botsArmy, bot]);
    setCollectionVisible(true);
  }

  function deleteFromArmy(bot) {
    const newArmy = botsArmy.filter((card) => card.id !== bot.id);
    const armyClasses = newArmy.map((bot) => bot.bot_class);
    const newCollection = BotCollection.filter((bot) =>
      console.log("Filter:", armyClasses.includes(bot.bot_class))
    );
    // console.log("newCollection", newCollection);

    setBotsArmy(newArmy);
    setFilteredCollection(newCollection);
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
        deleteCard={removeBotPermanently}
      />

      {collectionVisible ? (
        <BotCollection
          // bots={bots}
          // setBotsArmy={setBotsArmy}
          botCollection={filteredCollection}
          action={displayBotSpecs}
          deleteCard={removeBotPermanently}
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
