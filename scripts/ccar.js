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
    if (item === "quickrace") {
      document.querySelector(`#${item}`).checked = initialFormValues[item];
    } else {
      document.querySelector(`#${item}`).value = initialFormValues[item];
    }
  });
};

const getForm = () => {
  const ids = Object.keys(initialFormValues);
  console.log(ids);
  ids.forEach((item) => {
    const input = document.querySelector(`#${item}`);
    if (input.type === "number") {
      formValues[item] = parseFloat(input.value);
    } else if (input.type === "checkbox") {
      formValues[item] = input.checked;
    } else {
      formValues[item] = input.value;
    }
  });
  console.log(formValues);
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
  avgPrizes.forEach((item, i) => {
    tbody.innerHTML += `
      <tr class="${i % 2 ? "row-odd" : "row-even"}">
        <td>
          ${i === avgPrizes.length - 1 ? ">" : "<"}= ${item.maxAge}
        </td>
        <td class="${typeof item.avg}">${item.avg.toFixed(2)}</td>
      </tr>
    `;
  });
};

const createRarityTable = () => {
  const tbody = document.querySelector("#rarity-info tbody");
  tbody.innerHTML = "";
  rarityInfo.forEach((item, i) => {
    tbody.innerHTML += `
      <tr class="${i % 2 ? "row-odd" : "row-even"}">
        <td class="${typeof item.rarity}">${item.rarity}</td>
        <td class="${typeof item.fuel}">${item.fuel}</td>
        <td class="${typeof item.depreciation}">${item.depreciation}</td>
      </td>
    `;
  });
};

const createRoiTable = () => {
  const tbody = document.querySelector("#roi-table tbody");
  tbody.innerHTML = "";
  const totalRuns = getFuel(formValues.rarity) / 15;
  const quickrace = formValues.quickrace ? 1 : 0;
  const lastDayofDepreciation = avgPrizes[avgPrizes.length - 1].maxAge;
  let total = 0;
  for (let i = 0; i < lastDayofDepreciation; i += 1) {
    const day = i + 1;
    const fix = day % formValues.depreciation ? 0 : formValues.fix;
    const prize =
      (getAvgPrize(day) /
        (getFuel(formValues.rarity) / constants.fuelPerRace)) *
      totalRuns;
    const totalDay = prize - fix - formValues.refuel - quickrace;
    total += totalDay;
    const roi =
      total -
      parseFloat(formValues.buy) +
      parseFloat(formValues.sell) * (1 - constants.sellTax);
    tbody.innerHTML += `
      <tr class="${i % 2 ? "row-odd" : "row-even"}">
        <td class="${typeof day}">${day}</td>
        <td class="${typeof fix}">${fix}</td>
        <td class="${typeof prize}">${prize.toFixed(2)}</td>
        <td class="${typeof totalDay}">${totalDay.toFixed(2)}</td>
        <td class='${typeof total} ${
      total >= formValues.buy ? "positive" : "negative"
    }'>
          ${total.toFixed(2)}
        </td>
        <td class="${typeof roi} ${roi < 0 ? "negative" : "positive"}">
          ${roi.toFixed(2)}
        </td>
      </tr>
    `;
  }
};

const updateDepreciation = () => {
  const addPerLevels = Math.floor(
    parseInt(formValues.level) / constants.levelsForExtraDay
  );
  document.querySelector("#depreciation").value =
    getDepreciation(formValues.rarity) + addPerLevels;
  getForm();
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

select.addEventListener("change", () => {
  getForm();
  updateDepreciation();
});

level.addEventListener("change", () => {
  getForm();
  updateDepreciation();
});
