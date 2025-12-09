const fs = require("fs");
const https = require("https");

// Curated programming quotes (used 50% of the time for variety)
const programmingQuotes = [
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "The best error message is the one that never shows up.", author: "Thomas Fuchs" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "Java is to JavaScript what car is to carpet.", author: "Chris Heilmann" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
  { text: "Debugging is twice as hard as writing the code in the first place.", author: "Brian Kernighan" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupéry" },
  { text: "It's not a bug — it's an undocumented feature.", author: "Anonymous" },
  { text: "If debugging is the process of removing software bugs, then programming must be the process of putting them in.", author: "Edsger Dijkstra" },
  { text: "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.", author: "Bill Gates" },
  { text: "One of my most productive days was throwing away 1,000 lines of code.", author: "Ken Thompson" },
  { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
  { text: "The function of good software is to make the complex appear to be simple.", author: "Grady Booch" },
  { text: "Good code is its own best documentation.", author: "Steve McConnell" },
  { text: "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.", author: "Patrick McKenzie" },
];

// Fetch quote from ZenQuotes API
const fetchZenQuote = () => {
  return new Promise((resolve) => {
    https.get("https://zenquotes.io/api/random", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json[0] && json[0].q && json[0].a) {
            resolve({ text: json[0].q, author: json[0].a });
          } else {
            resolve(null);
          }
        } catch {
          resolve(null);
        }
      });
    }).on("error", () => resolve(null));
  });
};

// Get random programming quote
const getRandomProgrammingQuote = () => {
  return programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)];
};

// Main
const main = async () => {
  let quote;
  const useProgrammingQuote = Math.random() < 0.5; // 50% chance for each type

  if (useProgrammingQuote) {
    console.log("🔄 Selecting programming quote...");
    quote = getRandomProgrammingQuote();
    console.log("💻 Using programming quote");
  } else {
    console.log("🔄 Fetching inspirational quote from ZenQuotes API...");
    quote = await fetchZenQuote();
    if (quote) {
      console.log("✨ Got inspirational quote from API");
    } else {
      console.log("⚠️ API failed, using programming quote fallback");
      quote = getRandomProgrammingQuote();
    }
  }

  const quoteMarkdown = `> "${quote.text}"\n>\n> — *${quote.author}*`;

  let template = fs.readFileSync("template.md").toString();
  template = template.replace("{QUOTE_HERE}", quoteMarkdown);
  fs.writeFileSync("README.md", template);

  console.log("✅ README.md updated");
  console.log(`📝 Quote: "${quote.text}" — ${quote.author}`);
};

main();
