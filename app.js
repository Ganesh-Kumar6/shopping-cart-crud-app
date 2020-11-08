const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const container = document.querySelector("#container");
const outputDiv = document.querySelector("#outputDiv");

const fetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  Origin: "https://shopping-cart-crud-app.herokuapp.com/",
};

async function getData() {
  try {
    const response = await fetch(
      "https://shopping-cart-crud-app.herokuapp.com/backend",
      fetchOptions
    );

    // console.log("the response object is ", response);
    return response.json();
  } catch (error) {
    return error.message;
  }
}

function removeNewLineChar() {}

btn.addEventListener("click", () => {
  const inputData = { query: input.value.replace(/\s/gm, " ") };
  input.value = "";

  fetchOptions.body = JSON.stringify(inputData);

  // console.log(JSON.stringify(inputData));

  getData()
    .then((data) => {
      if (typeof data.result !== "object") {
        // console.log("here is the text -> ", data.result);
        outputDiv.innerHTML = `<h3>${JSON.stringify(data.result)}</h3>`;
      } else {
        if (Array.isArray(data.result)) {
          let tableBegin = `
        <table id="table">
          <tr>
            <th> Id </th>
            <th> Name </th>
            <th> Brand </th>
            <th> Cost per item </th>
            <th> Quantity </th>
            <th> Total cost </th>
            <th> Availability </th>
          </tr>`;

          let tableMid = data.result
            .map((item) => {
              return `
            <tr>
              <td class="td">${item.id}</td>
              <td class="td">${item.name}</td>
              <td class="td">${item.brand}</td>
              <td class="td">${item.costPerItem}</td>
              <td class="td">${item.quantity}</td>
              <td class="td">${item.totalCost}</td>
              <td class="td">${item.availability}</td>
            </tr>
        `;
            })
            .join("");

          let tableEnd = `</table>`;

          outputDiv.innerHTML = tableBegin + tableMid + tableEnd;
        } else {
          // console.log("here is the object -> ", data.result);

          let keys = Object.keys(data.result);
          let vals = Object.values(data.result);

          outputDiv.innerHTML = keys
            .map((item, index) => {
              return `<p>${keys[index]} : ${vals[index]}</p>`;
            })
            .join("");
        }
      }
    })
    .catch((error) => {
      outputDiv.innerHTML = `<h3> Error : ${error.message}</h3>`;
    });
});
