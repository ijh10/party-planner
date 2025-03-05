//Constants
const BASE_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2412-izzy";
const RESOURCE = "/events";
const API = BASE_URL + COHORT + RESOURCE;
//state
let parties = [];
let singleparty;

async function getParties() {
  try {
    const reponse = await fetch(API);
    const result = await reponse.json();
    parties = result.data;
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
async function getParty(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    singleparty = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}
function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
      <a href="#selected">${party.name}</a>
    `;
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}
function SelectedParty() {
  if (!singleparty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $party = document.createElement("section");
  $party.innerHTML = `
      <h3>${singleparty.name} #${singleparty.id}</h3>
      <time datetime="${singleparty.date}">
        ${singleparty.date.slice(0, 10)}
      </time>
      <address>${singleparty.location}</address>
      <p>${singleparty.description}</p>
      
    `;

  return $party;
}

/** A list of names of all parties */
function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");

  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
          <h1>Party Planner</h1>
          <main>
            <section>
              <h2>Upcoming Parties</h2>
              <PartyList></PartyList>
            </section>
            <section id="selected">
              <h2>Party Details</h2>
              <SelectedParty></SelectedParty>
            </section>
          </main>
        `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("SelectedParty").replaceWith(SelectedParty());
}

async function init() {
  await getParties();
  render();
}

init();
