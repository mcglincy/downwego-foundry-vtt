export class DWGMonsterSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["downwego", "sheet", "actor", "monster"],
      template: "systems/downwego/templates/actor/monster-sheet.html",
      width: 820,
      height: 490,
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

}
