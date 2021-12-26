// Environment Variables
var domTicker = document.getElementById("asset-ticker");
var domName = document.getElementById("asset-name");
var domPrice = document.getElementById("asset-price");
var domTrades = document.getElementById("todays-trades");
var domProfitLoss = document.getElementById("profit-loss");
var request = new XMLHttpRequest();
var requestData = null;
var previousTick;
var currentTick;

// Asset Variables
var currentAsset = "BTC";
var currentAssetType = "crypto";
var currentAssetMarket = "BINANCE";
var currentAssetTicker = "BTCUSDT";
var showAssetName = true;
var currentAssetName = "Bitcoin/USD";
var currentAssetPreviousPrice;
var currentAssetPrice;
var poschartData = [];
var negchartData = [];
var runningTotal = 0;
var showTrades = 8;
var apiURL = "https://cloud.iexapis.com/stable/";
var apiToken = "pk_66884ccfd8424b3b9ed5281fb22297fa"


// My Variables
var profitLoss = 0;
var todaysTrades = [
	///*
	{ type: "stock", name: "AIM", ticker: "AIM", shares: 1000, entry: 2.65, exit: 3.25, direction: "long", isOption: false }
	, { type: "stock", name: "AIM", ticker: "AIM", shares: 1000, entry: 2.65, exit: -1, direction: "long", isOption: false }
	, { type: "stock", name: "AIM", ticker: "AIM", shares: 1000, entry: 2.65, exit: 3.25, direction: "short", isOption: false }
	, { type: "stock", name: "AIM", ticker: "AIM", shares: 1000, entry: 2.65, exit: -1, direction: "short", isOption: false }
	, { type: "crypto", name: "BTC", ticker: "BTCUSDT", shares: 2, entry: 9798, exit: 9810, direction: "long", isOption: false }
	, { type: "crypto", name: "BTC", ticker: "BTCUSDT", shares: 2, entry: 9798, exit: -1, direction: "long", isOption: false }
	, { type: "crypto", name: "BTC", ticker: "BTCUSDT", shares: 2, entry: 9798, exit: 9810, direction: "short", isOption: false }
	, { type: "crypto", name: "BTC", ticker: "BTCUSDT", shares: 2, entry: 9798, exit: -1, direction: "short", isOption: false }
	//*/
	/*
	{ type: "option", name: "SPY 277 Calls", ticker: "SPY20200619C00277000", shares: 10, entry: 2.75, exit: 2.57, direction: "long", isOption: true }
	,{ type: "option", name: "SPY 277 Calls", ticker: "SPY20200619C00277000", shares: 10, entry: 2.75, exit: -1, direction: "long", isOption: true }
	,{ type: "option", name: "SPY 277 Calls", ticker: "SPY20200619C00277000", shares: 10, entry: 2.75, exit: 2.57, direction: "short", isOption: true }
	,{ type: "option", name: "SPY 277 Calls", ticker: "SPY20200619C00277000", shares: 10, entry: 2.75, exit: -1, direction: "short", isOption: true }
	,{ type: "option", name: "SPY 277 Puts", ticker: "SPY20200619P00277000", shares: 10, entry: 2.75, exit: 2.57, direction: "long", isOption: true }
	,{ type: "option", name: "SPY 277 Puts", ticker: "SPY20200619P00277000", shares: 10, entry: 2.75, exit: -1, direction: "long", isOption: true }
	,{ type: "option", name: "SPY 277 Puts", ticker: "SPY20200619P00277000", shares: 10, entry: 2.75, exit: 2.57, direction: "short", isOption: true }
	,{ type: "option", name: "SPY 277 Puts", ticker: "SPY20200619P00277000", shares: 10, entry: 2.75, exit: -1, direction: "short", isOption: true }
	*/
];

// Initial update.
updateMainTicker();
updateTodaysTradesAndProfitLoss();

// Interval functions.
setInterval(updateMainTicker, 3000);
setInterval(updateTodaysTradesAndProfitLoss, 3000);
//setInterval(updateChart, 600);

function updateChart() {
	trendChart.update;
}

// Update functions.
function updateMainTicker() {
	var realQuote = getPrice(currentAssetType, currentAssetTicker);
	updatePrice(realQuote);
	domTicker.innerText = currentAsset;

	if (showAssetName)
		domName.innerText = currentAssetName;

}

function getPrice(assetType, assetTicker) {
	var requestURL = apiURL + assetType + "/" + assetTicker + "/quote?token=" + apiToken;
	var price = undefined;
	request.open("GET", requestURL, false);
	request.onload = function () {
		requestData = JSON.parse(this.response);

		if (request.status >= 200 && request.status < 400) {
			if (currentAssetType == "stock" && !requestData.isMarketOpen) {
				price = Number.parseFloat(requestData.extendedPrice).toFixed(2);
			}
			else { price = Number.parseFloat(requestData.latestPrice).toFixed(2); }
		}
	};
	request.send();
	return price;
}

function calcProfitLoss(trade) {
	var value = 0;
	if (trade.exit != -1) {
		if (trade.direction == "long") value += (trade.exit - trade.entry) * trade.shares;
		else value += (trade.entry - trade.exit) * trade.shares;
	}
	else {
		if (trade.isOption) { value += 0; }
		else if (trade.direction == "long") value += (getPrice(trade.type, trade.ticker) - trade.entry) * trade.shares;
		else value += (trade.entry - getPrice(trade.type, trade.ticker)) * trade.shares;
	}
	if (trade.isOption) {
		value *= 100;
	}
	return value;
}

function updateTodaysTradesAndProfitLoss() {
	var plGainLossClass = "gain";
	var total = 0;
	var cost = 0;
	var runningTotal = 0;
	poschartData = [];
	negchartData = [];
	poschartData.push(runningTotal);
	negchartData.push(runningTotal);
	for (var t = 0; t < todaysTrades.length; t++) {
		var trade = todaysTrades[t];
		total += calcProfitLoss(trade);
		runningTotal += calcProfitLoss(trade);

		if (trade.type == "stock")
			cost += trade.isOption ? trade.entry * trade.shares * 100 : trade.entry * trade.shares;
		else {
			// Crypto trades only add to cost if they are losing trades.
			if (trade.entry > trade.exit && trade.direction == "long")
				cost += trade.entry - trade.exit;
		}
		if (runningTotal > 0) {
			poschartData.push(runningTotal);
			negchartData.push(0);
		} else if (runningTotal < 0) {
			poschartData.push(0);
			negchartData.push(runningTotal);
		} else {
			poschartData.push(0);
			negchartData.push(0);
		}
	}

	profitLoss = total;
	if (profitLoss < 0) plGainLossClass = "loss";

	domProfitLoss.innerHTML =
		'P/L Day: <span class="plval ' +
		plGainLossClass +
		'">' +
		formatDollarAmount(profitLoss, true) +
		' ' + formatPercentage(profitLoss, cost) + '&nbsp;</span><br>Leveraged: <span class="plval ">' + formatDollarAmount(cost, false) + '&nbsp;</span>';

	var tradeHTML = "";
	showTrades =
		todaysTrades.length < showTrades ? todaysTrades.length : showTrades;
	for (
		var i = todaysTrades.length - 1;
		i > todaysTrades.length - (showTrades + 1);
		i--
	) {
		tradeHTML += "<li>" + (i + 1) + ". ";
		tradeHTML += todaysTrades[i].name;
		tradeHTML += ' <i class="fas fa-chart-line';
		if (todaysTrades[i].type == "short") tradeHTML += '-down loss"';
		else tradeHTML += ' gain"';

		tradeHTML += "></i> ";
		tradeHTML += "$" + todaysTrades[i].entry.toFixed(2);
		tradeHTML += ' <i class="fas fa-chevron-double-right ';
		if (
			todaysTrades[i].exit == todaysTrades[i].entry ||
			todaysTrades[i].exit == -1
		)
			tradeHTML += '"';
		else {
			if (todaysTrades[i].direction == "long")
				tradeHTML +=
					todaysTrades[i].exit < todaysTrades[i].entry ? 'loss"' : 'gain"';
			else
				tradeHTML +=
					todaysTrades[i].exit > todaysTrades[i].entry ? 'loss"' : 'gain"';
		}
		tradeHTML += "></i> ";
		if (todaysTrades[i].exit != -1)
			tradeHTML += "$" + todaysTrades[i].exit.toFixed(2);
		else {
			tradeHTML += '<span class="gauge">Pending…</span> ';
			if (!todaysTrades[i].isOption) { tradeHTML += getPrice(todaysTrades[i].type, todaysTrades[i].ticker); }
		}

		tradeHTML += " x " + todaysTrades[i].shares;
		var tradePL = calcProfitLoss(todaysTrades[i]).toFixed(2);
		tradeHTML += ' <span class="plval ';
		tradeHTML += tradePL < 0 ? 'loss">' : 'gain">';
		tradeHTML += "$" + thousands_separators(Math.abs(tradePL));
		tradeHTML += "</li>";
	}

	domTrades.innerHTML = tradeHTML;
}

function updatePrice(price) {
	currentAssetPrice = price;
	if (currentAssetPrice > currentAssetPreviousPrice)
		domTicker.classList.add("uptick");
	else if (currentAssetPrice < currentAssetPreviousPrice)
		domTicker.classList.add("downtick");

	setTimeout(removeTickResultClass, 900);
	currentAssetPreviousPrice = currentAssetPrice;
	domPrice.innerText = "$" + currentAssetPrice;
}

function removeTickResultClass() {
	domTicker.classList.remove("uptick");
	domTicker.classList.remove("downtick");
}
function formatDollarAmount(val, useSigns) {
	var result = "$" + thousands_separators(Math.abs(val).toFixed(2));
	if (useSigns) {
		if (val < 0) result = "-" + result;
		else result = "+" + result;
	}

	return result;
}
function formatPercentage(pl, cost) {
	if (cost == 0)
		return "(0%)";

	var roi = ((pl / cost) * 100).toFixed(2);
	var result = "(" + roi + "%)";

	return result;
}
function thousands_separators(num) {
	var num_parts = num.toString().split(".");
	num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	return num_parts.join(".");
}

var ctx = document.getElementById("trendChart").getContext("2d");
var trendChart = new Chart(ctx, {
	type: "line",
	data: {
		labels: poschartData,
		datasets: [
			{
				data: poschartData,
				pointRadius: 0,
				fill: true,
				backgroundColor: ["rgba(38, 166, 154, 0.2)"],
				borderColor: ["rgba(51, 51, 51, 0)"],
				borderWidth: 1
			},
			{
				data: negchartData,
				pointRadius: 0,
				fill: true,
				backgroundColor: ["rgba(239, 83, 80, 0.2)"],
				borderColor: ["rgba(51, 51, 51, 0)"],
				borderWidth: 1
			}
		]
	},
	options: {
		animation: false,
		legend: { display: false },
		labels: { display: false },
		hover: false,
		scales: {
			yAxes: [
				{
					display: false,
					ticks: {
						beginAtZero: false
					}
				}
			],
			xAxes: [
				{
					display: false
				}
			]
		}
	}
});


/* Crypto

 */

/* Stocks
{
	  "description": "S&P 500",
	  "proName": "AMEX:SPY"
	},
	{
	  "description": "Tesla",
	  "proName": "NASDAQ:TSLA"
	},
	{
	  "description": "Carnival",
	  "proName": "NYSE:CCL"
	},
	{
	  "description": "Applied DNA Sciences",
	  "proName": "NASDAQ:APDN"
	},
	{
	  "description": "BioPharmX",
	  "proName": "AMEX:BPMX"
	},
	{
	  "description": "Novus Theraputics",
	  "proName": "NASDAQ:NVUS"
	},
	{
	  "description": "AIM Immunotech",
	  "proName": "AMEX:AIM"
	},
	{
	  "description": "Marathon Patent Group",
	  "proName": "NASDAQ:MARA"
	}
*/