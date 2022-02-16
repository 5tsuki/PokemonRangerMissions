// Ranger2: Pokémon Ranger: Shadows of Almia
// Ranger3: Pokémon Ranger: Guardian Signs

const path = require("path")
const fs = require("fs")

const filePath = (filename) => path.join(__dirname, filename)

const missions = {
  "ShadowsOfAlmia": {
    path: `${filePath("/binaries/RangerNetMissions2.bin")}`,
    length: 148034
  },
  "GuardianSigns": {
    path: `${filePath("/binaries/RangerNetMissions3.bin")}`,
    length: 153344
  }
}

const almia = filePath("/test/RangerShadowOfAlmia.sav")

const inputSaveFileSize = 262144;

const rawSaveFile = fs.readFileSync(almia, { flag: 'r' })
const rawMissions = fs.readFileSync(missions.ShadowsOfAlmia.path, { flag: 'r' })
const outputSaveFile = Buffer.alloc(rawSaveFile.length)

if (rawSaveFile.length === inputSaveFileSize) {
  console.log("input file is good")
} else {
  throw new Error("Input File Bad")
}

if (rawMissions.length === missions.ShadowsOfAlmia.length) {
  console.log("Mission file is good")
} else {
  throw new Error("Mission File Bad")
}

rawSaveFile.copy(outputSaveFile, 0, 0, (rawSaveFile.length - rawMissions.length))
rawMissions.copy(outputSaveFile, (rawSaveFile.length - rawMissions.length), 0, rawMissions.length)

fs.writeFile("save.sav", outputSaveFile, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
})