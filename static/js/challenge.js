// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");

    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");

      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
};

// Keep track of all filters
var filters = [
  {
    filterID: "datetime",
    filterSet: false,
    value: ""
  },
  {
    filterID: "city",
    filterSet: false,
    value: ""
  },
  {
    filterID: "state",
    filterSet: false,
    value: ""
  },
  {
    filterID: "country",
    filterSet: false,
    value: ""
  },
  {
    filterID: "shape",
    filterSet: false,
    value: ""
  }
];

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  let date = d3.select("#datetime").property("value");
  let city = d3.select("#city-input").property("value");
  let state = d3.select("#state-input").property("value");
  let country = d3.select("#country-input").property("value");
  let shape = d3.select("#shape-input").property("value");

  // Create a function to easily set filters
  function setFilter(filterID, filterSet, filterValue) {
    filters.forEach((filter) => {
      if (filter.filterID === filterID) {
        filter.filterSet = filterSet;
        filter.value = filterValue;
      }
    });
  }

  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object
  if (date) { 
    setFilter("datetime", true, date);
  } else {
    setFilter("datetime", false, "");
  }
  if (city) {
    setFilter("city", true, city)
  } else {
    setFilter("city", false, "");
  }
  if (state) {
    setFilter("state", true, state);
  } else {
    setFilter("state", false, "");
  }
  if (country) {
    setFilter("country", true, country);
  } else {
    setFilter("country", false, "");
  }
  if (shape) {
    setFilter("shape", true, shape);
  } else {
    setFilter("shape", false, "");
  }

  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  filters.forEach((filter) => {
    if (filter.filterSet) {
      if (filter.filterID === "datetime") {
        filteredData = filteredData.filter(row => row.datetime === filter.value);
      }
      if (filter.filterID === "city") {
        filteredData = filteredData.filter(row => row.city === filter.value);
      }
      if (filter.filterID === "state") {
        filteredData = filteredData.filter(row => row.state === filter.value);
      }
      if (filter.filterID === "country") {
        filteredData = filteredData.filter(row => row.country === filter.value);
      }
      if (filter.filterID === "shape") {
        filteredData = filteredData.filter(row => row.shape === filter.value);
      }
    }
  });

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);
