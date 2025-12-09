const fs = require("fs");

// Simply copy template to README (no more crypto data)
const template = fs.readFileSync("template.md").toString();
fs.writeFileSync("README.md", template);

console.log("✅ README.md updated");
