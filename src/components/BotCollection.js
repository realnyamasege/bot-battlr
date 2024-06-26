import React from "react";
import BotCard from "./BotCard";

function BotCollection({
  bots,
  setBotsArmy,
  action,

  removeBotPermanently,
}) {
  // Your code here

  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
        Collection of all bots
        {bots &&
          bots.map((bot) => {
            return (
              <BotCard
                key={bot.id}
                bot={bot}
                action={action}
                enlist={() => setBotsArmy(bot)}
                removeBotPermanently={removeBotPermanently}
              />
            );
          })}
      </div>
    </div>
  );
}

export default BotCollection;
