const calcBtn = document.querySelector(".calc-btn");
const resetBtn = document.querySelector(".reset-btn");

const level = document.querySelector("#level");
const select = document.querySelector("#rarity");

let formValues = initialFormValues;

const rarities = rarityInfo.map((item) => item.rarity);

const getDepreciation = (rarity) => {
  return rarityInfo.find((item) => item.rarity === rarity).depreciation;
};

const getFuel = (rarity) => {
  return rarityInfo.find((item) => item.rarity === rarity).fuel;
};

const getAvgPrize = (day) => {
  const lastChange = avgPrizes[avgPrizes.length - 1];
  return day < lastChange.maxAge
    ? avgPrizes.find((item) => day <= item.maxAge).avg
    : lastChange.avg;
};

const resetForm = () => {
  const ids = Object.keys(initialFormValues);
  ids.forEach((item) => {
    document.querySelector(`#${item}`).value = initialFormValues[item];
  });
};

const getForm = () => {
  const ids = Object.keys(initialFormValues);
  ids.forEach((item) => {
    const input = document.querySelector(`#${item}`);
    if (input.type === "number") {
      formValues[item] = parseFloat(input.value);
    } else {
      formValues[item] = input.value;
    }
  });
};

const createSelect = () => {
  select.innerHTML = "";
  rarities.forEach((rarity) => {
    select.innerHTML += `<option value="${rarity}">${rarity}</option>`;
  });
};

const createPrizeTable = () => {
  const tbody = document.querySelector("#prize-avg tbody");
  tbody.innerHTML = "";
  avgPrizes.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td><= ${item.maxAge}</td>
        <td>${item.avg.toFixed(2)}</td>
      </tr>
    `;
  });
};

const createRarityTable = () => {
  const tbody = document.querySelector("#rarity-info tbody");
  tbody.innerHTML = "";
  rarityInfo.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.rarity}</td>
        <td>${item.fuel}</td>
        <td>${item.depreciation}</td>
      </td>
    `;
  });
};

const createRoiTable = () => {
  const tbody = document.querySelector("#roi-table tbody");
  tbody.innerHTML = "";
  const totalRuns = getFuel(formValues.rarity) / 15;
  const lastDayofDepreciation = avgPrizes[avgPrizes.length - 1].maxAge;
  let total = 0;
  for (let i = 0; i < lastDayofDepreciation; i += 1) {
    const day = i + 1;
    const fix = day % getDepreciation(formValues.rarity) ? 0 : formValues.fix;
    const prize = (getAvgPrize(day) / 4) * totalRuns;
    const totalDay = prize - fix - formValues.refuel;
    total += totalDay;
    tbody.innerHTML += `
      <tr>
        <td>${day}</td>
        <td>${fix}</td>
        <td>${prize.toFixed(2)}</td>
        <td>${totalDay.toFixed(2)}</td>
        <td class='${
          total >= formValues.price ? "positive" : "negative"
        }'>${total.toFixed(2)}</td>
      </tr>
    `;
  }
};

const updateDepreciation = () => {
  const addPerLevels = Math.floor(parseInt(formValues.level) / 10);
  document.querySelector("#depreciation").value =
    getDepreciation(formValues.rarity) + addPerLevels;
};

createSelect();
resetForm();
createPrizeTable();
createRarityTable();
createRoiTable();

resetBtn.addEventListener("click", () => {
  resetForm();
  getForm();
  createRoiTable();
});

calcBtn.addEventListener("click", () => {
  getForm();
  createRoiTable();
});

select.addEventListener("change", (e) => {
  getForm();
  updateDepreciation();
});

level.addEventListener("change", (e) => {
  getForm();
  updateDepreciation();
});
