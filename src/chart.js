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

    const container = document.getElementById("individual-results");
    container.innerHTML = "";

    data.forEach((d,i) => {
        container.innerHTML += `
        <tr class="border-white">
						<th>${i + 1}</th>
						<th>${d.name}</th>
						<th>${d.guild}</th>
						<th>${d.time/1000} s</th>
				</tr>    
        `

    })

}

const setGuilds = (data) => {
    if (data === undefined || data.length == 0)
        return;

    const container = document.getElementById("guild-results");
    container.innerHTML = "";

    data.forEach(d => {
        container.innerHTML += `
        <tr class="border-white">
          <th>${d.name}</th>
          <th>${d.total}</th>
          <th>${d.average/1000} s</th>
          <th>${d.median/1000} s</th>
        </tr>   
        `
    })

}





getScores()