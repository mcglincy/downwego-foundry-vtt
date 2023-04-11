export class DWGCharacterSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        classes: ["downwego", "sheet", "actor", "character"],
        template: "systems/downwego/templates/actor/character-sheet.html",
        width: 820,
        height: 900,
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
      return superData;
    }


      /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find(".role-name.bloodthirsty").on("click", this._rollBloodthirsty.bind(this));
    html.find(".role-name.holy").on("click", this._rollHoly.bind(this));
    html.find(".role-name.mystical").on("click", this._rollMystical.bind(this));
    html.find(".role-name.sneaky").on("click", this._rollSneaky.bind(this));
    html.find(".label.attack").on("click", this._rollAttack.bind(this));
    html.find(".label.defense").on("click", this._rollDefense.bind(this));
    html.find(".label.initiative").on("click", this._rollInitiative.bind(this));
    html.find(".label.luck").on("click", this._rollLuck.bind(this));
  }

  _rollBloodthirsty() {
    this.actor.rollBloodthirsty();
  }

  _rollHoly() {
    this.actor.rollHoly();
  }

  _rollMystical() {
    this.actor.rollMystical();
  }

  _rollSneaky() {
    this.actor.rollSneaky();
  }

  _rollAttack() {
    this.actor.rollAttack();
  }

  _rollDefense() {
    this.actor.rollDefense();
  }  

  _rollInitiative() {
    this.actor.rollInitiative();
  }  

  _rollLuck() {
    this.actor.rollLuck();
  }  

}