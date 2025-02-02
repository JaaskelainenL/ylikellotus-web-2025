var auth = ""
var interval = null

const setAuth = () => {

  var u = prompt("Käyttäjänimi");
  var pw = prompt("Salasana");

  if(u === "admin" && pw==="Ylikellotus2025")
      window.location = "https://www.youtube.com/watch?v=SQxqEPl95IM"

  auth = btoa(u+":"+pw)
}


const postScores = () => {
  const name = document.getElementById("name").value
  const guild = document.getElementById("guild").value
  const time = (parseFloat(document.getElementById("time").value)*1000).toString().replace(",",".")


  fetch("https://backend-tb3t.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + authHash,
    },
    body:JSON.stringify({
      name: name,
      guild:guild,
      time:time
    })
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to post leaderboard data");
    }
    return res.json();
  })
  .then((res) => {
    getScores();
    document.getElementById("name").value = ""
    document.getElementById("guild").value = ""
    document.getElementById("time").value = ""
  })
  .catch((error) => {
    console.error("ERROR WITH POSTING LEADERBOARD DATA: " + error);
  });
}



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
    })
    .catch((error) => {
      console.error("ERROR WITH FETCHING LEADERBOARD DATA: " + error);
    });
  if(interval == null){
    interval = setTimeout(getScores, 10000);
  }
}


const deletePost = (id) => {
  fetch("https://backend-tb3t.onrender.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Basic " + authHash,
    },
    body:JSON.stringify({
      id:id
    })
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete leaderboard data");
    }
    return res.json();
  })
  .then((res) => {
    getScores();
  })
  .catch((error) => {
    console.error("ERROR WITH DELETING LEADERBOARD DATA: " + error);
  });
}




const setTableData = (data) => {
    if (data === undefined || data.length == 0)
        return;

    const container = document.getElementById("results");
    container.innerHTML = "";

    data.forEach(d => {

        container.innerHTML += ```
				<div class="flex justify-between text-white text-2xl font-airstrike w-full md:flex-nowrap">
          <button onClick="deletePost(${d.id})">Poista</button>
					<h1 class="w-full md:w-auto">${d.name}</h1>
					<h1 class="w-full md:w-auto">${d.guild}</h1>
					<h1 class="w-full md:w-auto">${d.time/1000}s</h1>
				</div>        
        ```

    })

}





getScores()