google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Ranking', 'SPI'],

    #for(d in state.ranking.reversedTeams):
      ['#(d.team.name)',  #(d.SPI_)],

    #endfor
  ]);

  var options = {
    colors: ['orange'],
      title: 'Distribution of SPI in: #(state.title)',
      hAxis: {
      ticks: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
      textStyle: {color: "white"}
    },
    legend: {textStyle: {color: 'white', fontSize: 16}},
    titleTextStyle: {color: "white"},
    vAxis: {
      minorGridlines: {count: 0},
      textStyle: {color: "white"},

    },
    chartArea:{width:'95%',height:'75%',backgroundColor: "black"},
    bar: { gap: 0 },

    histogram: {
      bucketSize: 0.02,
      maxNumBuckets: 20,
      minValue: 0,
      maxValue: 100
    },
    backgroundColor: "black"

};

var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options);
}

window.addEventListener("resize", drawChart);