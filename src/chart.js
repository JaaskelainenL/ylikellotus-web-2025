const getScores = () => {
    fetch("https://backend-tb3t.onrender.com")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }
      return res.json();
    })
    .then((res) => {
      setTableData(res);
      setGuilds(grouped(res));
    })
    .catch((error) => {
      console.error("ERROR WITH FETCHING LEADERBOARD DATA: " + error);
    });
  setTimeout(getScores, 10000);
}

const grouped = (data) => {
    let result= []
    data.forEach((s) => {
      const guild = s.guild.toUpperCase().replace('TIK', 'TiK').replace('ATHENE', 'Athene').replace('PRODEKO', 'Prodeko').replace('INKUBIO', 'Inkubio');
      const g = result.find(g => g.name === guild)
      if(g === undefined) {
        result.push({name: guild, scores: [s], average: 0, median: 0, total: 0})
      } else {
        g.scores.push(s)
      }
    })
    result.forEach((g) => {
      g.average = g.scores.reduce((acc, c) => acc + c.time, 0) / g.scores.length;
      g.median = g.scores[Math.floor(g.scores.length / 2)].time;
      g.total = g.scores.length;
    })
    return result;



}


const setTableData = (data) => {
    if (data === undefined || data.length == 0)
        return;

    const container = document.getElementById("results");
    container.innerHTML = "";

    data.forEach(d => {

        container.innerHTML += ```
				<div class="flex justify-between text-white text-2xl font-airstrike w-full md:flex-nowrap">
					<h1 class="w-full md:w-auto">${d.name}</h1>
					<h1 class="w-full md:w-auto">${d.guild}</h1>
					<h1 class="w-full md:w-auto">${d.time/1000}s</h1>
				</div>        
        ```

    })

}

const setGuilds = (data) => {
    if (data === undefined || data.length == 0)
        return;

    const container = document.getElementById("results-guild");
    container.innerHTML = "";

    data.forEach(d => {

        container.innerHTML += ```
				<div class="flex justify-between text-white text-2xl font-airstrike w-full md:flex-nowrap">
					<h1 class="w-full md:w-auto">${d.guild}</h1>
                    <h1 class="w-full md:w-auto">${d.total}</h1>
					<h1 class="w-full md:w-auto">${d.average/1000}s</h1>
                    <h1 class="w-full md:w-auto">${d.median/1000}</h1>
				</div>        
        ```

    })

}





getScores()