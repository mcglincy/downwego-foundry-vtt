export class DWGCharacterSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["downwego", "sheet", "actor", "character"],
        template: "systems/downwego/templates/actor/character-sheet.html",
        // width: 411,
        // height: 900,
        width: 850,
        height: 800,
        tabs: [
          {
            navSelector: ".sheet-tabs",
            contentSelector: ".sheet-body",
            initial: "combat",
          },
        ],
        dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
      });
    }


    /** @override */
    getData() {
      const superData = super.getData();
      superData.data.system.hits.max = this.actor.maxHits;
      superData.data.system.roles.bloodthirsty.level = this.actor.bloodthirstyLevel;
      superData.data.system.toHitModifier = superData.data.system.roles.bloodthirsty.level;
      superData.data.system.roles.holy.level = this.actor.holyLevel;
      superData.data.system.roles.mystical.level = this.actor.mysticalLevel;
      superData.data.system.roles.sneaky.level = this.actor.sneakyLevel;
      superData.data.system.defenseModifier = superData.data.system.roles.sneaky.level;
      console.log(superData);
      return superData;
    }

}