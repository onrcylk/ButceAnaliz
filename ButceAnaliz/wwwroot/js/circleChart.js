
var pivot = new WebDataRocks({
    container: "#wdr-component",
    toolbar: true,
    customizeCell: customizeCellFunction,
    report: {
        dataSource: {
            data: getData()
        },
        formats: [{
            maxDecimalPlaces: 2
        }],
        "slice": {
            "rows": [{
                "uniqueName": "Customer Country"
            }],
            "columns": [{
                "uniqueName": "Period",
                "filter": {
                    "type": "top",
                    "quantity": 2,
                    "measure": "Incremental Sales"
                },
                "sort": "unsorted"
            },
            {
                "uniqueName": "Measures"
            }
            ],
            "measures": [{
                "uniqueName": "Incremental Sales",
                "aggregation": "percent"
            }],
            "sorting": {
                "row": {
                    "type": "desc",
                    "tuple": [],
                    "measure": "Incremental Sales"
                },
                "column": {
                    "type": "desc",
                    "tuple": [
                        "Customer Country.Canada"
                    ],
                    "measure": "Incremental Sales"
                }
            }
        }
    },
    reportcomplete: function () {
        pivot.off("reportcomplete");
        pivotTableReportComplete = true;
        createGoogleChart();
    }
});

/* In this function we highlight only the grand totals from columns (you can the conditions). Also, you can the colors for the cells in CSS and colors for the chart in a drawChart() function */
function customizeCellFunction(cell, data) {
    if (data.isGrandTotalColumn) {
        if (data.value < 4) cell.addClass("wdr-grand-total-column1");
        else if (data.value > 4 & data.value < 7) cell.addClass("wdr-grand-total-column2");
        else if (data.value > 7 & data.value < 15) cell.addClass("wdr-grand-total-column3");
        else if (data.value > 15 & data.value < 25) cell.addClass("wdr-grand-total-column4");
        else if (data.value > 25 & data.value < 30) cell.addClass("wdr-grand-total-column5");
        else if (data.value > 26) cell.addClass("wdr-grand-total-column6");
    }
}


var pivotTableReportComplete = false;
var googleChartsLoaded = false;

google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(onGoogleChartsLoaded);

function onGoogleChartsLoaded() {
    googleChartsLoaded = true;
    if (pivotTableReportComplete) {
        createGoogleChart();
    }
}
/*
Get data from the pivot that is specially processed for Google Charts with the help of WebDataRocks connector. Draw the chart after rendering the grid and loading the report. Redraw the chart if there were any changes in the pivot table
*/
function createGoogleChart() {
    if (googleChartsLoaded) {
        pivot.googlecharts.getData({
            type: "pie"
        },
            drawChart,
            drawChart
        );
    }
}

/*
Set options to the charts, choose its type and draw it
*/
function drawChart(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);

    var options = {
        title: "Incremental sales by countries",
        titleTextStyle: {
            fontSize: 24
        },
        legend: {
            position: 'top'
        },
        pieHole: 0.4,
        colors: ['#cfdfc4', '#fde2a3', '#f6c2a8', '#9aafc7', '#82c3b8', '#d4c4df']
    };

    var chart = new google.visualization.PieChart(document.getElementById('googlechart-container'));
    chart.draw(data, options);
}


function getData() {
    return [{
        "Period": {
            "type": "year/quarter/month/day"
        },
        "Customer Country": {
            "type": "string"
        },
        "Incremental Sales": {
            "type": "number"
        },
        "Leads": {
            "type": "number"
        },
        "New Customers": {
            "type": "number"
        },
        "Marketing investment": {
            "type": "number"
        }
    },
    {
        "Marketing investment": 1000,
        "Period": "2018-06-01",
        "Customer Country": "Australia",
        "Incremental Sales": 980,
        "Leads": 225,
        "New Customers": 50
    },
    {
        "Marketing investment": 800,
        "Period": "2018-07-01",
        "Customer Country": "Canada",
        "Incremental Sales": 5020,
        "Leads": 90,
        "New Customers": 78
    },
    {
        "Marketing investment": 460,
        "Period": "2018-08-01",
        "Customer Country": "France",
        "Incremental Sales": 2070,
        "Leads": 134,
        "New Customers": 37
    },
    {
        "Marketing investment": 520,
        "Period": "2017-01-01",
        "Customer Country": "Germany",
        "Incremental Sales": 340,
        "Leads": 120,
        "New Customers": 70
    },
    {
        "Marketing investment": 520,
        "Period": "2017-02-01",
        "Customer Country": "Germany",
        "Incremental Sales": 780,
        "Leads": 230,
        "New Customers": 60
    },
    {
        "Marketing investment": 520,
        "Period": "2017-03-01",
        "Customer Country": "Germany",
        "Incremental Sales": 1220,
        "Leads": 200,
        "New Customers": 40
    },
    {
        "Marketing investment": 520,
        "Period": "2017-04-01",
        "Customer Country": "Germany",
        "Incremental Sales": 1510,
        "Leads": 270,
        "New Customers": 30
    },
    {
        "Marketing investment": 520,
        "Period": "2017-05-01",
        "Customer Country": "Germany",
        "Incremental Sales": 2060,
        "Leads": 200,
        "New Customers": 70
    },
    {
        "Marketing investment": 520,
        "Period": "2017-02-01",
        "Customer Country": "United Kingdom",
        "Incremental Sales": 780,
        "Leads": 230,
        "New Customers": 60
    },
    {
        "Marketing investment": 520,
        "Period": "2017-03-01",
        "Customer Country": "United Kingdom",
        "Incremental Sales": 120,
        "Leads": 200,
        "New Customers": 40
    },
    {
        "Marketing investment": 520,
        "Period": "2017-04-01",
        "Customer Country": "United Kingdom",
        "Incremental Sales": 760,
        "Leads": 270,
        "New Customers": 30
    },
    {
        "Marketing investment": 520,
        "Period": "2017-05-01",
        "Customer Country": "United Kingdom",
        "Incremental Sales": 500,
        "Leads": 200,
        "New Customers": 70
    },
    {
        "Marketing investment": 670,
        "Period": "2017-06-01",
        "Customer Country": "United Kingdom",
        "Incremental Sales": 599,
        "Leads": 115,
        "New Customers": 30
    },
    {
        "Marketing investment": 550,
        "Period": "2017-07-01",
        "Customer Country": "United States",
        "Incremental Sales": 876,
        "Leads": 88,
        "New Customers": 38
    },
    {
        "Marketing investment": 1150,
        "Period": "2017-08-01",
        "Customer Country": "Australia",
        "Incremental Sales": 680,
        "Leads": 56,
        "New Customers": 70
    },
    {
        "Marketing investment": 980,
        "Period": "2017-09-01",
        "Customer Country": "Canada",
        "Incremental Sales": 1241,
        "Leads": 50,
        "New Customers": 60
    },
    {
        "Marketing investment": 500,
        "Period": "2017-10-01",
        "Customer Country": "Canada",
        "Incremental Sales": 1241,
        "Leads": 219,
        "New Customers": 40
    },
    {
        "Marketing investment": 2458,
        "Period": "2017-11-01",
        "Customer Country": "France",
        "Incremental Sales": 1300,
        "Leads": 67,
        "New Customers": 30
    },
    {
        "Marketing investment": 1400,
        "Period": "2017-12-01",
        "Customer Country": "Germany",
        "Incremental Sales": 780,
        "Leads": 343,
        "New Customers": 22
    },
    {
        "Marketing investment": 700,
        "Period": "2018-01-01",
        "Customer Country": "Canada",
        "Incremental Sales": 501,
        "Leads": 90,
        "New Customers": 9
    },
    {
        "Marketing investment": 800,
        "Period": "2018-02-01",
        "Customer Country": "Canada",
        "Incremental Sales": 501,
        "Leads": 159,
        "New Customers": 9
    },
    {
        "Marketing investment": 900,
        "Period": "2018-03-01",
        "Customer Country": "Canada",
        "Incremental Sales": 501,
        "Leads": 123,
        "New Customers": 9
    },
    {
        "Marketing investment": 400,
        "Period": "2018-04-01",
        "Customer Country": "Canada",
        "Incremental Sales": 279,
        "Leads": 216,
        "New Customers": 9
    },
    {
        "Marketing investment": 700,
        "Period": "2018-01-01",
        "Customer Country": "France",
        "Incremental Sales": 897,
        "Leads": 90,
        "New Customers": 10
    },
    {
        "Marketing investment": 800,
        "Period": "2018-02-01",
        "Customer Country": "France",
        "Incremental Sales": 233,
        "Leads": 159,
        "New Customers": 11
    },
    {
        "Marketing investment": 900,
        "Period": "2018-03-01",
        "Customer Country": "France",
        "Incremental Sales": 451,
        "Leads": 73,
        "New Customers": 12
    },
    {
        "Marketing investment": 400,
        "Period": "2018-04-01",
        "Customer Country": "France",
        "Incremental Sales": 211,
        "Leads": 46,
        "New Customers": 6
    }
    ]
}