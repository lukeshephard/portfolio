import { TypewriterClass } from 'typewriter-effect';


function simulateLoading(typewriter: TypewriterClass, duration: number, keepEllipsis=false) {
  typewriter.typeString("...");
  for (let i = 0; i < duration - 1; i++) {
    typewriter.deleteChars(3)
    typewriter.typeString("...");
  }

  if (!keepEllipsis) {
    typewriter.deleteChars(3)
  }

}


function checkSystemStatus(typewriter: TypewriterClass) {
    typewriter.typeString("Checking system status...")
    .typeString("<br/>/projects")
    simulateLoading(typewriter, 1)

    typewriter.typeString(" ONLINE")
    .typeString("<br/>/experience")
    simulateLoading(typewriter, 3)
    typewriter.typeString(" ONLINE")
    .typeString("<br/>/education")
    simulateLoading(typewriter, 2)
    typewriter.typeString(" ONLINE")
    .typeString("<br/>Styling")
    simulateLoading(typewriter, 1)

    typewriter.typeString(" OPERATIONAL")
    .typeString("<br/>Themes")
    simulateLoading(typewriter, 1)
    typewriter.typeString(" OPERATIONAL")
    .typeString("<br/>Images")
    simulateLoading(typewriter, 3)
    typewriter.typeString(" OPERATIONAL")
    .typeString("<br/>External links")
    simulateLoading(typewriter, 4)
    typewriter.typeString(" OPERATIONAL")

    .typeString("<br/>SUCCESS 7 FAIL 0")
}

function pullData(typewriter: TypewriterClass) {
    typewriter.typeString("Pulling latest data...")
    .typeString("<br/>GET https://github.com/lukeshephard/personal-website.git")
    simulateLoading(typewriter, 11)
    typewriter.typeString(" 200 in 3793ms")
    .typeString("<br/>Verifying signature")
    simulateLoading(typewriter, 4)
    typewriter.typeString(" SUCCESS")

    .typeString("<br/>FOUND personal-website")
    .typeString("<br/>VERSION 1.0.0-alpha-3")
    .typeString("<br/>Checking version matches")
    simulateLoading(typewriter, 2)
    typewriter.typeString(" SUCCESS")      
}

const allModules = [
    checkSystemStatus,
    pullData
]

function getRandomModule() {
    return allModules[Math.floor(Math.random() * allModules.length)]
}


export default getRandomModule;
