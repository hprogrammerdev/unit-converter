const translations = {
  ar: {
    dir: "rtl",
    title: "🔁 محول وحدات",
    categoryLabel: "نوع التحويل:",
    inputLabel: "القيمة:",
    fromLabel: "من:",
    toLabel: "إلى:",
    convert: "🔄 تحويل",
    result: "💡 الناتج سيظهر هنا",
    langToggle: "🌐 English",
    categories: {
      length: "الطول",
      weight: "الوزن",
      temperature: "الحرارة",
    },
  },
  en: {
    dir: "ltr",
    title: "🔁 Unit Converter",
    categoryLabel: "Conversion Type:",
    inputLabel: "Value:",
    fromLabel: "From:",
    toLabel: "To:",
    convert: "🔄 Convert",
    result: "💡 Result will appear here",
    langToggle: "🌐 العربية",
    categories: {
      length: "Length",
      weight: "Weight",
      temperature: "Temperature",
    },
  },
};

const units = {
  length: {
    ar: {
      meter: "متر",
      foot: "قدم",
      kilometer: "كيلومتر",
      mile: "ميل",
    },
    en: {
      meter: "Meter",
      foot: "Foot",
      kilometer: "Kilometer",
      mile: "Mile",
    },
  },
  weight: {
    ar: {
      kilogram: "كيلوجرام",
      gram: "غرام",
      pound: "رطل",
      ton: "طن",
    },
    en: {
      kilogram: "Kilogram",
      gram: "Gram",
      pound: "Pound",
      ton: "Ton",
    },
  },
  temperature: {
    ar: {
      celsius: "مئوية",
      fahrenheit: "فهرنهايت",
      kelvin: "كلفن",
    },
    en: {
      celsius: "Celsius",
      fahrenheit: "Fahrenheit",
      kelvin: "Kelvin",
    },
  },
};

let currentLang = "ar";

function populateCategoryOptions() {
  const catSelect = $("#category");
  catSelect.empty();
  const cats = translations[currentLang].categories;
  for (const key in cats) {
    catSelect.append(`<option value="${key}">${cats[key]}</option>`);
  }
}

function populateUnits(category) {
  const unitList = units[category][currentLang];
  const from = $("#from-unit");
  const to = $("#to-unit");

  from.empty();
  to.empty();

  for (const key in unitList) {
    from.append(`<option value="${key}">${unitList[key]}</option>`);
    to.append(`<option value="${key}">${unitList[key]}</option>`);
  }
}

function updateLanguage() {
  const t = translations[currentLang];

  $("html").attr("lang", currentLang).attr("dir", t.dir);
  $("#title").text(t.title);
  $("#category-label").text(t.categoryLabel);
  $("#input-label").text(t.inputLabel);
  $("#from-label").text(t.fromLabel);
  $("#to-label").text(t.toLabel);
  $("#convert-btn").text(t.convert);
  $("#result").text(t.result);
  $("#toggle-lang").text(t.langToggle);

  populateCategoryOptions();
  populateUnits($("#category").val());
}

function convertUnits() {
  const inputVal = $("#input-value").val();
  if (inputVal === "") {
    const msg =
      currentLang === "ar"
        ? "⚠️ الرجاء إدخال قيمة أولاً"
        : "⚠️ Please enter a value first";
    $("#result").text(msg);
    return;
  }

  const val = parseFloat(inputVal);
  const from = $("#from-unit").val();
  const to = $("#to-unit").val();
  const category = $("#category").val();

  let result = val;

  if (category === "length") {
    const toMeter = {
      meter: 1,
      kilometer: 1000,
      foot: 0.3048,
      mile: 1609.34,
    };
    result = (val * toMeter[from]) / toMeter[to];
  } else if (category === "weight") {
    const toKg = {
      kilogram: 1,
      gram: 0.001,
      pound: 0.453592,
      ton: 1000,
    };
    result = (val * toKg[from]) / toKg[to];
  } else if (category === "temperature") {
    if (from === to) {
      result = val;
    } else if (from === "celsius" && to === "fahrenheit") {
      result = (val * 9) / 5 + 32;
    } else if (from === "fahrenheit" && to === "celsius") {
      result = ((val - 32) * 5) / 9;
    } else if (from === "celsius" && to === "kelvin") {
      result = val + 273.15;
    } else if (from === "kelvin" && to === "celsius") {
      result = val - 273.15;
    } else if (from === "fahrenheit" && to === "kelvin") {
      result = ((val - 32) * 5) / 9 + 273.15;
    } else if (from === "kelvin" && to === "fahrenheit") {
      result = ((val - 273.15) * 9) / 5 + 32;
    }
  }

  $("#result").text(`✅ ${result.toFixed(2)}`);
}

$(document).ready(function () {
  updateLanguage();

  $("#category").on("change", function () {
    populateUnits(this.value);
  });

  $("#convert-btn").on("click", convertUnits);

  $("#toggle-lang").on("click", function () {
    currentLang = currentLang === "ar" ? "en" : "ar";
    updateLanguage();
  });

  $("#toggle-theme").on("click", function () {
    $("body").toggleClass("dark light");
    const isDark = $("body").hasClass("dark");
    $(this).text(isDark ? "☀️" : "🌙");
  });
});
