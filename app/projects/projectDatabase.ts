// See project.ts for all available attributes
export const projectDatabase = [
    {
        name: "personal-website",
        title: "Personal Website",
        summary: "My very own website to add everything about myself (the website you are on right now).",
        description: `I thought it would be fun and a good learning experience to try to make a personal website.
            I also thought a place to showcase my projects to would cool, and even mention some private projects like university ones.
            At the moment it is being improved over time as I improve my react and front-end skills.`,
        lastEdited: 1739200006236,
    },
    {
        name: "database-demo",
        title: "Database Demo",
        summary: "A little database builder.",
        description: `Originally a prototype I was making to test out how databases work in web browsers,
            I kept thinking of new interesting features to add and now it is my main project at the moment. While it does not really have
            much practical use other than a neat gimmick, it helps a lot with working on my GUI skills and currently is helping me improve my webpage designs.`,
        lastEdited: 1739200006236,
    },
    {
        name: "advent-of-code-2024",
        title: "Advent of Code 2024",
        summary: "My solutions to Advent of Code 2024.",
        description: `I found out about Advent of Code a little late into the Christmas of 2024, but once I started I wanted to try finish it all anyway.
            As off writing this it is just over half way done, and the first half was very fun with some of the problems being my all time favourites.
            I got a bit busy and need to learn Dijkstra's algorithm before I carry on, but I'm going to finish it eventually.
            I chose to do it in python using the procedural programming paradigm as they are 2 areas that I do not do much so I thought it would work well as a good recap.
            If I ever get the chance, I will try to go back and do previous years but my project backlog is already huge enough as it is haha...`,
        lastEdited: 1739204235250,
        isWebsite: false
    },
    {
        name: "website-template",
        title: "Website Template",
        summary: "A base template that I use for my webstites",
        description: `With my newer projects, I get more and more experience with React and then the newer ones end up looking nicer than the older ones.
            To fix this, I made a repository that I keep a template in and update it when I have a lot of new features to add.
            This template shares a bunch of files that I use across multiple projects, like buttons and styling. After an update I can then
            easily update my past projects with the newer design as they already have the shared files.`,
        lastEdited: 1739200663746,
    },
    {
        name: "tic-tac-toe",
        title: "Tic Tac Toe",
        summary: "The famous X and O game, extending greatly from the React tutorial to add other features like bots.",
        description: `This was first React project. Everything felt a bit overwhelming so I followed the react tutorial and tried out NextJS.
            Eventually I got the hang of it so after I had finished the tutorial I went on to add new features. I added bots with different difficulties,
            and made custom components like buttons and select boxes to aid user experience. After 1.0 I worked on a 2.0 version (with a lot of features/ideas) but it got way too big way too fast so I scrapped it.
            However, the quality of life improvments I made in the alpha versions were really good so I'm planning to bring them over along while adding website-template to make a final 1.1 release (when I get around to it, probably after website-template has mobile support).`,
        lastEdited: 1739201341617,
    },
    {
        name: "little-man-computer",
        title: "Little Man Computer",
        summary: "My A-level 2023 Computer Science Project.",
        description: `This was my biggest project I had done to date at the time, I had to work on it over a number of weeks while documenting what I did.
            First I had to do research into little man computer, looking at existing projects and what I would change for mine. Then I had to design it,
            documenting each requirement and their priorities. Lastly I had to actually build it from those requirements. I aimed at a more mordern version,
            aimed at students so I had animations to show the fetch, decode, execute cycle in a simplistic way. The documentation got to over 100 pages.
            Overall, it went well and I got an A* for it. It was made in p5.js as that is what we used throughout A-level.
            I have a lot of new features and ideas for a reimagined version that I would love to do in the future, made in React instead and using
            everything I have learned in recent years to properly rebuild it from the ground up.`,
        lastEdited: 1739202134043,
    },
    {
        name: "point-region-quadtree",
        title: "Point Region Quadtree",
        summary: "A showcase of a point region quadtree, the user can click on the canvas to add points and watch it divide.",
        description: `This project was supposed to be proper version of the Automata Tool, but it got too big and I think I lost control of it very quickly.
            It ended up at this vision for an app that could show different data structures and the user would be able to interact with them and see how they link to each other. 
            This was just before I started learning React, so I was still using pure HTML and JavaScript and experimenting with webpack. I was trying to optimise drawing shapes and text to canvases with minimal redrawing.
            With that and looking into collision detection with the shapes and the mouse, I ended up working on quadtrees as the first structure and this is the furthest the app got.
            You can see in the files I had some partially working FSA code too. I didn't really want to just leave what I did though as nothing so I turned it into this.
            I do like though how there is a whole hidden layer of unused stuff inside the repository. Adding "new FSADisplay()" to index.js will show the little I had started on the actual Automata Tool I wanted to create in the first place.
            The canvas was optimised though and it does run well so that part was a success.`,
        lastEdited: 1739204714253,
    },
    {
        name: "maze-generator",
        title: "Maze Generator",
        summary: "A tool to generate random mazes of different sizes",
        description: `I wanted to have a look into mazes back when was doing A-Level so I made this app quickly just to experiment with
            path finding algorithms. It ends up becoming slow when big mazes are generated but I was not really interested in improving it, since it was
            really just an experiment. Since it was made in p5.js you can right click and save an image of the maze though which is a pretty cool unintended feature,
            though there are no entrances and exits to the mazes so they are pretty useless. I keep it on my Github as it is something cool I did once and it works well for what it is.
            I have tons of A-level experiments but most of them are clunky, unfinished or straight up broken at this point so at least I have this one to showcase.`,
        lastEdited: 1739203740900,
    },
    {
        name: "automata-tool-prototype",
        title: "Automata Tool (Prototype)",
        summary: "A concept for a tool that lets users create Automata, then import/export them.",
        description: `This was something I made after finishing year 1 of university, as I had this a cool idea and wanted to just see how well it would work.
            I made it in 3 days which is why it looks so plain and I still was using pure HTML and JavaScript to do this, with not much experience with styling.
            I just wanted to focus on the most important features, and style was not one of them here. The prototype works okay for what it is, I was limited
            with the arrows by my maths skills. States cannot have multiple edges to the same state or any edges to their own state as that required curved lines between them,
            and I had (still have) no clue how to do that in a way where they adapt every time another edge is added between the same states. The importing and exporting
            is cool though, but the user has to manually drag out each state from the center to see the full machine. There is an algorithm to build graphs like that and position
            them neatly but again that was too much for me. One big issue as you can see was I did not use any libraries, and I would definitely use one for that diagram side of things next time.
            I started to work on a more fleshed out version as I thought this went well, but then it became point-region-quadtree and it has more information on that page.`,
        lastEdited: 1739204714253,
    },
    {
        name: "battleships",
        title: "Battleships",
        summary: "A recreation of the popular board game, made in HTML, JavaScript and CSS.",
        description: `This is probably my favourite of my A-Level side projects, as it works well and everyone knows battleships so it's something I can actually show to people who don't know computer science.
            I also really like how it turned out, with my limited web skills at the time. I only had a months of learning how to program for the web after just knowing python. I saw the potential of having something
            I could share without needing it to be downloaded too and a game is perfect for that. The display is just 2 grids with each cell containing the class for the needed colour,
            and the top grid just runs a turn when the player clicks a cell and that is basically the game. One of the hardest parts was making the edges of cells disappear to form the outline of boats.
            There is also a local two player version that I made and I was going to combine them together but they were quite different in terms of code that I never got round to do it, so they are separate projects.
            I would love to recreate this in React sometime, as I already have Tic Tac Toe and that is pretty similar to Battleships in terms of implementation.`,
        lastEdited: 1739206426248,
    },
    {
        name: "clock-of-clocks",
        title:  "Clock of Clocks",
        summary: "Website that displays a digital clock made of tiny anologue clocks.",
        description: "TBA",
        lastEdited: 1739206465535,
    },
    {
        name: "HorseRaceSimulator",
        title: "Horse Race Simulator",
        summary: "A coursework project for one of my first year university modules (ECS414U - Object-Oriented Programming)",
        description: "TBA",
        isPrivate: true,
        isWebsite: false,
        lastEdited: 1739206465535,
    },
    {
        name: "battleships-two-player",
        title: "Battleships (Two Player)",
        summary: "A two player version of my Battleships project.",
        description: "TBA",
        isPrivate: true,
        isWebsite: false,
        lastEdited: 1739206465535,
    },
]