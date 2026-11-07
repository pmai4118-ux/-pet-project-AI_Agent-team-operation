import { filterTickets, statuses, tickets } from "./filter.mjs";

const select = document.querySelector("#status");
const list = document.querySelector("#tickets");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const labels = new Map(statuses.map(({ id, label }) => [id, label]));

for (const { id, label } of statuses) {
  select.add(new Option(label, id));
}

function makeTicket(ticket) {
  const row = document.createElement("li");
  const name = document.createElement("span");
  name.textContent = `${ticket.id} · ${ticket.title}`;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.dataset.status = ticket.status;
  badge.textContent = labels.get(ticket.status);
  row.append(name, badge);
  return row;
}

function render() {
  const visible = filterTickets(tickets, select.value);
  list.replaceChildren(...visible.map(makeTicket));
  count.textContent = `${visible.length} ticket`;
  list.hidden = visible.length === 0;
  empty.hidden = visible.length !== 0;
}

select.value = "all";
select.addEventListener("change", render);
render();
