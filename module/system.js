import { DWGActor } from "./actor/actor.js";
import { DWGCharacterSheet } from "./actor/character-sheet.js";
import { DWGMonsterSheet } from "./actor/monster-sheet.js";

Hooks.once("init", async () => {
  registerDocumentClasses();
  registerSheets();
  registerHandlebarsHelpers();
  await registerHandlebarsPartials();
});

const registerDocumentClasses = () => {
  CONFIG.Actor.documentClass = DWGActor;
  //CONFIG.Item.documentClass = CYItem;
}

const registerSheets = () => {
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("downwego", DWGCharacterSheet, {
    types: ["character"],
    makeDefault: true,
    label: "DWG.CharacterSheet",
  });
  Actors.registerSheet("downwego", DWGMonsterSheet, {
    types: ["monster"],
    makeDefault: true,
    label: "DWG.MonsterSheet",
  });  
  // Actors.registerSheet(CY.system, CYNpcSheet, {
  //   types: ["npc"],
  //   makeDefault: true,
  //   label: "CY.NpcSheet",
  // });
  // Actors.registerSheet(CY.system, CYVehicleSheet, {
  //   types: ["vehicle"],
  //   makeDefault: true,
  //   label: "CY.VehicleSheet",
  // });
  // Items.unregisterSheet("core", ItemSheet);
  // Items.registerSheet(CY.system, CYItemSheet, {
  //   makeDefault: true,
  //   label: "CY.ItemSheet",
  // });  
};

const registerHandlebarsPartials = async () => {
  await loadTemplates([
    "systems/downwego/templates/actor/gear-tab.html",
    "systems/downwego/templates/actor/notes-tab.html",
    "systems/downwego/templates/actor/role-tab.html",
    "systems/downwego/templates/actor/rules-tab.html",
  ]);
}

const registerHandlebarsHelpers = () => {
  /**
   * Formats a Roll as either the total or x + y + z = total if the roll has multiple terms.
   */
   Handlebars.registerHelper("xtotal", (roll) => {
    // collapse addition of negatives into just subtractions
    // e.g., 15 +  - 1 => 15 - 1
    // Also: apparently roll.result uses 2 spaces as separators?
    // We replace both 2- and 1-space varieties
    const result = roll.result.replace("+  -", "-").replace("+ -", "-");
    // roll.result is a string of terms. E.g., "16" or "1 + 15".
    if (result !== roll.total.toString()) {
      return `${result} = ${roll.total}`;
    } else {
      return result;
    }
  });  

  Handlebars.registerHelper("ifEq", function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("ifLt", function (arg1, arg2, options) {
    return arg1 < arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("ifGt", function (arg1, arg2, options) {
    return arg1 > arg2 ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper("ceil", function (num) {
    return Math.ceil(num);
  });

  Handlebars.registerHelper('times', function(n, block) {
    let accum = '';
    for(let i = 0; i < n; ++i) {
      accum += block.fn(i);
    }
    return accum;
  });
}
