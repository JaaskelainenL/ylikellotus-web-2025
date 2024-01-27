import '../styles.css'

function Leaderboard() {

    let names = ["Juhani Marjatta Korhonen", "moikkelis", "koikkelis"];
    let times = ["22", "35", "46"];
    let guilds = ["TiK","SiK","KiK"];

    return (
        <div>
            <table>
                <tr>
                    <td>Nimi</td>
                    <td>Aika</td>
                    <td>Kilta</td>
                </tr>
                <tr>
                    <td>{names[0]}</td>
                    <td>{times[0]}</td>
                    <td>{guilds[0]}</td>
                </tr>
                <tr>
                    <td>{names[1]}</td>
                    <td>{times[1]}</td>
                    <td>{guilds[1]}</td>
                </tr>
                <tr>
                    <td>{names[2]}</td>
                    <td>{times[2]}</td>
                    <td>{guilds[2]}</td>
                </tr>

            </table>
        </div>
    )
}

export default Leaderboard
