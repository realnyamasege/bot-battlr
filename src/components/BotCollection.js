import React from "react";
import BotCard from "./BotCard";

function BotCollection({ BotCollection, action, deleteCard }) {
  // Your code here

  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
        Collection of all bots
        {BotCollection &&
          BotCollection.map((bot) => {
            return (
              <BotCard
                deleteCard={deleteCard}
                key={bot.id}
                bot={bot}
                action={action}
              />
            );
          })}
      </div>
    </div>
  );
}

export default BotCollection;
