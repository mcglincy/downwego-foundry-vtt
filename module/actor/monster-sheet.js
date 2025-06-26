export class DWGMonsterSheet extends foundry.appv1.sheets.ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["downwego", "sheet", "actor", "monster"],
      template: "systems/downwego/templates/actor/monster-sheet.html",
      width: 740,
      height: 485,
      resizable: false,
    });
  }
}
