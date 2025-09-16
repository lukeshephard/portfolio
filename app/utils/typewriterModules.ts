import { TypewriterClass } from 'typewriter-effect';

const styleGuide = {
  success: "text-green-500",
  fail: "text-red-500",
}

function simulateLoading(typewriter: TypewriterClass, duration: number, keepEllipsis=false) {
  typewriter.typeString("...");
  for (let i = 0; i < duration - 1; i++) {
    typewriter.deleteChars(3)
    typewriter.typeString("...");
  }

  if (!keepEllipsis) {
    typewriter.deleteChars(3);
  }

}


function typewriterLine(typewriter: TypewriterClass, text: string) {
  typewriter.typeString(`${text}<br/>`);
}

function typewriterLineWithLoading(typewriter: TypewriterClass, duration: number, text: string, finishText?: string) {
  typewriter.typeString(text);
  simulateLoading(typewriter, duration, finishText === undefined);
  if (finishText) {
    typewriterLine(typewriter, ` ${finishText}`);
  } else {
    typewriterLine(typewriter, "");
  }
}

function styleText(text: string, style: string) {
  return `<span class="${style}">${text}</span>`
}

function styleLink(link: string) {
  return `<a href="${link}" ${link[0] === "/" ? `` : `target="_blank"`} class="text-link hover:text-link-hover active:text-link-active">${link}</a>`
}

export function initModule(typewriter: TypewriterClass) {
  typewriterLineWithLoading(typewriter, 5, `GET ${styleLink("/backend")}`, `${styleText("200", styleGuide.success)} in 237ms`);
  
  typewriterLineWithLoading(typewriter, 7, "", "Checking status of pages");
  typewriterLineWithLoading(typewriter, 1, `${styleLink("/projects")}`, `${styleText("SUCCESS", styleGuide.success)}`);
  typewriterLineWithLoading(typewriter, 3, `${styleLink("/experience")}`, `${styleText("SUCCESS", styleGuide.success)}`);
  typewriterLineWithLoading(typewriter, 2, `${styleLink("/education")}`, `${styleText("SUCCESS", styleGuide.success)}`);
  typewriterLine(typewriter, `${styleText("SUCCESS", styleGuide.success)} 3 ${styleText("FAIL", styleGuide.fail)} 0`);

  typewriterLineWithLoading(typewriter, 3, "", "Verifying system integrity");
  typewriterLineWithLoading(typewriter, 1, "Styling", `${styleText("OPERATIONAL", styleGuide.success)}`);
  typewriterLineWithLoading(typewriter, 1, "Themes", `${styleText("OPERATIONAL", styleGuide.success)}`);
  typewriterLineWithLoading(typewriter, 3, "Images", `${styleText("OPERATIONAL", styleGuide.success)}`);
  typewriterLine(typewriter, `${styleText("SUCCESS", styleGuide.success)} 3 ${styleText("FAIL", styleGuide.fail)} 0`);
}

function pullData(typewriter: TypewriterClass) {
  typewriterLineWithLoading(typewriter, 11, `GET ${styleLink("https://github.com/lukeshephard/personal-website.git")}`, `${styleText("200", styleGuide.success)} in 792ms`);
  typewriterLineWithLoading(typewriter, 4, "Verifying signature", `${styleText("SUCCESS", styleGuide.success)}`);
  typewriterLineWithLoading(typewriter, 8, "Pulling data");

  typewriterLine(typewriter, `Found ${styleText("personal-website", styleGuide.success)} v1.0.0-alpha-3`);
  typewriterLineWithLoading(typewriter, 8, "", "This is the latest version!");    
}

function getRandomModule() { // exclude /backend (into)
  const keys = Object.keys(moduleNameMap);
  return keys[Math.floor(Math.random() * (keys.length - 1)) + 1]
}

export const moduleNameMap: {[key: string]: (typewriter: TypewriterClass) => void} = {
  "startup.sys": initModule,
  "pullData.exe": pullData,
}


export default getRandomModule;
