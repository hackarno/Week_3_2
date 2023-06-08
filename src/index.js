import "./styles.css";

const dataTable = document.getElementById("table");
getData();

async function getData() {
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const dataPromise = await fetch(url);
  const dataJSON = await dataPromise.json();

  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  const dataPromise2 = await fetch(url2);
  const dataJSON2 = await dataPromise2.json();

  const dataAlueet = dataJSON.dataset.dimension.Alue.category.label;
  const alueetKeys = Object.keys(dataAlueet);
  const dataVakiluku = dataJSON.dataset.value;
  const vakilukuKeys = Object.keys(dataVakiluku);
  const dataTyollisyys = dataJSON2.dataset.value;
  const tyollisyysKeys = Object.keys(dataTyollisyys);

  for (let i = 0; i <= alueetKeys.length - 1; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    td1.innerText = dataAlueet[alueetKeys[i]];
    td2.innerText = dataVakiluku[vakilukuKeys[i]];
    td3.innerText = dataTyollisyys[tyollisyysKeys[i]];

    let prosentti = parseFloat(
      (dataTyollisyys[tyollisyysKeys[i]] / dataVakiluku[vakilukuKeys[i]]) * 100
    ).toFixed(2);
    td4.innerText = prosentti + "%";

    if (prosentti > 45) {
      td4.className = "good";
    } else if (prosentti < 25) {
      td4.className = "bad";
    }

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    dataTable.appendChild(tr);
  }
}
