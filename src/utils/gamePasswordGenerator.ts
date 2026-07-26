interface GameData {
  nouns: string[];
  actions: string[];
}

const gameDatabase: Record<string, GameData> = {
  minecraft: {
    nouns: ["Steve", "Alex", "Creeper", "EnderDragon", "Diamond", "Netherite", "Redstone", "Obsidian", "StealthyEnderman", "Bedrock"],
    actions: ["Mine", "Craft", "Build", "Survive", "Smelt", "Dig"]
  },
  gta: {
    nouns: ["Trevor", "Michael", "Franklin", "CJ", "LosSantos", "ViceCity", "LibertyCity", "Heist", "Chop", "Lamar"],
    actions: ["Wasted", "Busted", "Drive", "Rob", "Escape", "Shoot"]
  },
  grandtheftauto: {
    nouns: ["Trevor", "Michael", "Franklin", "CJ", "LosSantos", "ViceCity", "LibertyCity", "Heist", "Chop", "Lamar"],
    actions: ["Wasted", "Busted", "Drive", "Rob", "Escape", "Shoot"]
  },
  cyberpunk: {
    nouns: ["V", "JohnnySilverhand", "Keanu", "NightCity", "Arasaka", "Edgerunner", "Choom", "Netrunner", "Militech", "Judy"],
    actions: ["Hack", "Chrome", "Override", "Decrypt", "Flatline", "Scan"]
  },
  witcher: {
    nouns: ["Geralt", "Yennefer", "Ciri", "Triss", "Rivia", "Roach", "WhiteWolf", "KaerMorhen", "Dandelion", "Vesemir"],
    actions: ["Hunt", "CastSign", "SlayMonsters", "BrewPotion", "Meditate"]
  },
  valorant: {
    nouns: ["Jett", "Phoenix", "Sage", "Reyna", "Raze", "Brimstone", "Omen", "Viper", "Sova", "Radiant", "Spike"],
    actions: ["PlantSpike", "Defuse", "Clutch", "Dash", "Ace", "Revive"]
  },
  eldenring: {
    nouns: ["Tarnished", "Malenia", "Miquella", "Marika", "Radahn", "EldenLord", "Erdtree", "Melina", "Ranni", "Godrick"],
    actions: ["PraiseSun", "RollDodge", "DodgeRoll", "Parry", "Defeat", "Ascend"]
  },
  darksouls: {
    nouns: ["AshenOne", "ChosenUndead", "Solaire", "Artorias", "Bonfire", "AnorLondo", "Gwyn", "EstusFlask", "Firekeeper"],
    actions: ["PraiseSun", "RollDodge", "Parry", "Kindle", "LinkFire"]
  },
  counterstrike: {
    nouns: ["GlobalElite", "Dust2", "AWP", "Defuser", "Terrorist", "CounterTerrorist", "Mirage", "DesertEagle", "CykaBlyat"],
    actions: ["RushB", "PlantBomb", "Clutch", "Headshot", "Frag", "Defuse"]
  },
  csgo: {
    nouns: ["GlobalElite", "Dust2", "AWP", "Defuser", "Terrorist", "CounterTerrorist", "Mirage", "DesertEagle", "CykaBlyat"],
    actions: ["RushB", "PlantBomb", "Clutch", "Headshot", "Frag", "Defuse"]
  },
  cs2: {
    nouns: ["GlobalElite", "Dust2", "AWP", "Defuser", "Terrorist", "CounterTerrorist", "Mirage", "DesertEagle", "CykaBlyat"],
    actions: ["RushB", "PlantBomb", "Clutch", "Headshot", "Frag", "Defuse"]
  },
  callofduty: {
    nouns: ["Soap", "Ghost", "CaptainPrice", "Warzone", "Gulag", "Nuketown", "Prestige", "Juggernaut", "TaskForce141"],
    actions: ["AimDownSights", "Reload", "Respawn", "SlideCancel", "Nuke"]
  },
  cod: {
    nouns: ["Soap", "Ghost", "CaptainPrice", "Warzone", "Gulag", "Nuketown", "Prestige", "Juggernaut", "TaskForce141"],
    actions: ["AimDownSights", "Reload", "Respawn", "SlideCancel", "Nuke"]
  },
  skyrim: {
    nouns: ["Dovahkiin", "Dragonborn", "Whiterun", "Sweetroll", "Alduin", "Tamriel", "Khajiit", "ArrowInKnee", "Greybeards"],
    actions: ["FusRoDah", "Shout", "Quest", "SneakLevel100", "Pickpocket"]
  },
  leagueoflegends: {
    nouns: ["Yasuo", "Teemo", "Jinx", "BaronNashor", "SummonersRift", "Nexus", "Minion", "Challenger", "Ahri", "Lux"],
    actions: ["Feed", "Carry", "Gank", "Flash", "Smite", "Pentakill"]
  },
  lol: {
    nouns: ["Yasuo", "Teemo", "Jinx", "BaronNashor", "SummonersRift", "Nexus", "Minion", "Challenger", "Ahri", "Lux"],
    actions: ["Feed", "Carry", "Gank", "Flash", "Smite", "Pentakill"]
  },
  fifa: {
    nouns: ["Messi", "Ronaldo", "Mbappe", "CareerMode", "BallonDor", "UltimateTeam", "FifaWorldCup"],
    actions: ["GoalCelebrate", "PowerShot", "Tackle", "Dribble", "Penalty"]
  },
  eafc: {
    nouns: ["Messi", "Ronaldo", "Mbappe", "CareerMode", "BallonDor", "UltimateTeam", "FifaWorldCup"],
    actions: ["GoalCelebrate", "PowerShot", "Tackle", "Dribble", "Penalty"]
  },
  apexlegends: {
    nouns: ["Wraith", "Pathfinder", "Octane", "Bloodhound", "Gibraltar", "KingsCanyon", "Champion", "DropShip", "ApexPredator"],
    actions: ["SlideJump", "HealUp", "PortalEscape", "DropHot", "SquadWipe"]
  },
  fortnite: {
    nouns: ["Jonesy", "Peely", "VBucks", "BattleBus", "TiltedTowers", "VictoryRoyale", "Llama", "SlurpJuice"],
    actions: ["ChugJug", "FlossEmote", "BuildFort", "Crank90s", "BoogieBomb"]
  },
  reddeadredemption: {
    nouns: ["ArthurMorgan", "JohnMarston", "DutchVanDerLinde", "Outlaw", "Blackwater", "Valentine", "SadieAdler", "Uncle"],
    actions: ["RideHorse", "DeadEye", "RobTrain", "Yeehaw", "Lumbago"]
  },
  rdr2: {
    nouns: ["ArthurMorgan", "JohnMarston", "DutchVanDerLinde", "Outlaw", "Blackwater", "Valentine", "SadieAdler", "Uncle"],
    actions: ["RideHorse", "DeadEye", "RobTrain", "Yeehaw", "Lumbago"]
  },
  godofwar: {
    nouns: ["Kratos", "Atreus", "Boy", "Mjolnir", "Thor", "Odin", "Ragnarok", "Midgard", "Valkyrie", "LeviathanAxe"],
    actions: ["SlayGods", "SpartanRage", "ThrowAxe", "RecallAxe", "FuriousStrike"]
  },
  spiderman: {
    nouns: ["PeterParker", "MilesMorales", "WebSlinger", "DailyBugle", "Venom", "GreenGoblin", "Oscorp", "Symbiote"],
    actions: ["WebSwing", "WallCrawl", "SpiderSense", "ZipLine", "Finisher"]
  },
  halo: {
    nouns: ["MasterChief", "Cortana", "Arbiter", "Warthog", "Covenant", "UNSC", "Reach", "EnergySword", "Spartan117"],
    actions: ["DoubleKill", "ShieldRecharge", "HijackVehicle", "SnipeHeadshot"]
  },
  zelda: {
    nouns: ["Link", "Zelda", "Ganon", "Hyrule", "Triforce", "MasterSword", "Rupee", "KorokSeed", "SheikahSlate"],
    actions: ["ExploreHyrule", "ShieldSurf", "Paraglide", "SolvePuzzle", "SpinAttack"]
  },
  mario: {
    nouns: ["Mario", "Luigi", "Peach", "Bowser", "Yoshi", "Toad", "MushroomKingdom", "SuperStar", "FireFlower"],
    actions: ["JumpHigh", "GroundPound", "ThrowCappy", "SavePeach", "SlidePipe"]
  },
  fallout: {
    nouns: ["VaultBoy", "PipBoy", "VaultDweller", "NukaCola", "Deathclaw", "BrotherhoodOfSteel", "Caps", "Wasteland", "Stimpak"],
    actions: ["VatsTarget", "HackTerminal", "Lockpick", "SurviveRad"]
  },
  roblox: {
    nouns: ["Robux", "Noob", "Guest", "AdoptMe", "Bloxburg", "Tycoon", "Obby", "OofSound"],
    actions: ["BuildGame", "TradePet", "ObbyComplete", "SpawnItem"]
  },
  amongus: {
    nouns: ["Imposter", "Crewmate", "EmergencyMeeting", "ElectricalRoom", "VentNetwork", "Skeld"],
    actions: ["Sabotage", "ReportBody", "VoteOut", "CompleteTasks", "SusDetector"]
  },
  genshin: {
    nouns: ["Traveler", "Paimon", "Primogems", "Teyvat", "Archon", "StatueOfSeven", "ResinCount", "MoraCoin", "GachaWish"],
    actions: ["DoubleJump", "ElementalBurst", "GlideWind", "WishTenPull", "FarmArtifacts"]
  },
  doom: {
    nouns: ["DoomSlayer", "CrucibleBlade", "Cyberdemon", "BFG9000", "ArgentEnergy", "UACFacility", "Phobos"],
    actions: ["RipAndTear", "GloryKill", "DashDodge", "ChainsawSlay"]
  },
  portal: {
    nouns: ["Chell", "Glados", "Wheatley", "ApertureScience", "CompanionCube", "TurretGuard", "CakeTruth"],
    actions: ["ThinkWithPortals", "TestSubject", "FlingJump", "SpamPortals"]
  },
  terraria: {
    nouns: ["GuideNPC", "EyeOfCthulhu", "ZenithBlade", "Terrarian", "CorruptionBiome", "CrimsonTome", "HellevatorShaft"],
    actions: ["DigDeep", "BuildCastle", "SlayBoss", "CraftZenith"]
  },
  assassinscreed: {
    nouns: ["EzioAuditore", "Altair", "EdwardKenway", "AnimusMachine", "BrotherhoodCreed", "TemplarTarget", "LeapOfFaith", "HiddenBlade"],
    actions: ["Assassinate", "ClimbTower", "SynchronizeView", "LeapFaith", "AirAssassinate"]
  }
};

const gamerAdjectives = [
  "Epic", "Pro", "Alpha", "Shadow", "Cyber", "Golden", "Rogue", "Void", "Neon", "Silent", 
  "Ghost", "Cosmic", "Quantum", "Astral", "Hyper", "Retro", "Elite", "Legend", "Toxic", "Glitch"
];

const gamerNouns = [
  "Pwned", "GGWP", "Vault", "Headshot", "Respawn", "RageQuit", "Frag", "Clutch", "LevelUp", 
  "HighScore", "Boss", "Nerfed", "Buffed", "Speedrun", "Ping", "Lag", "SpawnCamp", "NoobSlayer"
];

const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*", "+", "-", "=", "?"];

function convertToLeet(text: string): string {
  return text
    .replace(/[aA]/g, "4")
    .replace(/[eE]/g, "3")
    .replace(/[iI]/g, "1")
    .replace(/[oO]/g, "0")
    .replace(/[sS]/g, "$")
    .replace(/[tT]/g, "7")
    .replace(/[gG]/g, "9");
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface SuggestedPasswords {
  loreBased: string;
  leetStyle: string;
  stealthShort: string;
}

export function generatePasswordsFromGame(gameName: string): SuggestedPasswords {
  const normalized = gameName.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  
  let databaseMatchKey = "";
  for (const key of Object.keys(gameDatabase)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      databaseMatchKey = key;
      break;
    }
  }

  let noun1 = "";
  let noun2 = "";
  let action = "";

  if (databaseMatchKey && gameDatabase[databaseMatchKey]) {
    const db = gameDatabase[databaseMatchKey];
    noun1 = getRandomElement(db.nouns);
    const remainingNouns = db.nouns.filter(n => n !== noun1);
    noun2 = getRandomElement(remainingNouns.length > 0 ? remainingNouns : db.nouns);
    action = getRandomElement(db.actions);
  } else {
    const nameWords = gameName
      .trim()
      .split(/\s+/)
      .map(w => w.replace(/[^A-Za-z0-9]/g, ""))
      .filter(w => w.length > 0);

    if (nameWords.length > 0) {
      noun1 = nameWords[0];
      noun2 = nameWords[1] || getRandomElement(gamerNouns);
    } else {
      noun1 = "Gamer";
      noun2 = "Sentinel";
    }
    action = getRandomElement(gamerNouns);
  }

  noun1 = noun1.charAt(0).toUpperCase() + noun1.slice(1);
  noun2 = noun2.charAt(0).toUpperCase() + noun2.slice(1);
  action = action.charAt(0).toUpperCase() + action.slice(1);

  const num1 = getRandomNumber(10, 999);
  const sym1 = getRandomElement(specialCharacters);
  const loreBased = `${noun1}_${action}_${noun2}_${num1}${sym1}`;


  const leetNoun = convertToLeet(noun1);
  const leetAction = convertToLeet(action);
  const num2 = getRandomNumber(100, 9999);
  const sym2 = getRandomElement(specialCharacters);
  const leetStyle = `${leetNoun}_${leetAction}_${num2}${sym2}`;

  const nameInitials = gameName
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase())
    .join("")
    .replace(/[^A-Z0-9]/g, "");
  
  const initials = nameInitials.length > 0 ? nameInitials : "GV";
  const poolWords = Math.random() > 0.5 ? gamerAdjectives : gamerNouns;
  const randomGamer = getRandomElement(poolWords).slice(0, 5);
  const num3 = getRandomNumber(1, 99);
  const sym3 = getRandomElement(specialCharacters) + getRandomElement(specialCharacters);
  const stealthShort = `${initials}_${convertToLeet(randomGamer)}_${num3}${sym3}`;


  return {
    loreBased,
    leetStyle,
    stealthShort
  };
}
