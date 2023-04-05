const app = require("express")();
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const { checkPort, runClientOnPort } = require("./utils/utils");
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));
app.use(bodyParser.urlencoded({ extended: true }));
const storenames = [];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
  const { storename } = req.body;
  console.log(storename)
  if (storenames.indexOf(storename) !== -1) {
    return res.send("name already exists");
  }
  storenames.push(storename);
  for (let i = 8000; i <= 8100; i++) {
    const detais = await checkPort(i);
    if (detais.status === false) continue;
    if ((await runClientOnPort(i, storename)).status) {
      return res.redirect("http://localhost:" + i);
    }
    break;
  }
  res.redirect("/");
});

app.get("/api/:storename", (req, res) => {
  const storename = req.params.storename;
  return res.send("your store name is ", storename);
});

app.listen(8000);
