
import { roleAbilityProps } from "../constants.js";

/**
 * @extends {Actor}
 */
export class DWGActor extends Actor {

    /** @override */
    // static async create(data, options = {}) {
    //   data.prototypeToken = data.prototypeToken || {};
    //   let defaults = {};
    //   if (data.type === CY.actorTypes.character) {
    //     defaults = {
    //       actorLink: true,
    //       disposition: 1,
    //       vision: true,
    //     };
    //   } else if (data.type === CY.actorTypes.npc) {
    //     defaults = {
    //       actorLink: false,
    //       disposition: -1,
    //       vision: false,
    //     };
    //   } else if (data.type === CY.actorTypes.vehicle) {
    //     defaults = {
    //       actorLink: true,
    //       disposition: 0,
    //       vision: true,
    //     };
    //   } 
    //   mergeObject(data.prototypeToken, defaults, { overwrite: false });
    //   return super.create(data, options);
    // }

    get bloodthirstyLevel() {
      return this.roleLevel("bloodthirsty");
    }

    get holyLevel() {
      return this.roleLevel("holy");
    }

    get mysticalLevel() {
      return this.roleLevel("mystical");
    }

    get sneakyLevel() {
      return this.roleLevel("sneaky");
    }

    get maxHits() {
      const bloodthirsty = this.bloodthirstyLevel;
      const holy = this.holyLevel;
      const mystical = this.mysticalLevel;
      const sneaky = this.sneakyLevel;
      const maxLevel = Math.max(bloodthirsty, holy, mystical, sneaky);
      let roleHits = 0;
      if (maxLevel == bloodthirsty) {
        roleHits = 5;
      } else if (maxLevel == holy) {
        roleHits = 4;
      } else if (maxLevel == sneaky) {
        roleHits = 3;
      } else {
        // mystical
        roleHits = 2;
      }
      const bloodThirds = Math.floor(bloodthirsty / 3);
      const holyThirds = Math.floor(holy / 3);
      const mysticalThirds = Math.floor(mystical / 3);
      const sneakyThirds = Math.floor(sneaky / 3);
      return roleHits + bloodThirds + holyThirds + mysticalThirds + sneakyThirds;
    }

    roleLevel(roleName) {
      let level = 0;
      const role = this.system.roles?.[roleName];
      if (role) {
        for (const prop of roleAbilityProps) {
          if (role[prop]) {
            level++;
          }
        }
      }
      return level;
    }
}
