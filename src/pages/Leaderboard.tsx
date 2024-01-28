import '../styles.css'
import { useEffect, useState} from "react"

function Leaderboard() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch("https://ylikellotus.lajp.fi/")
        .then(response => response.json())
        .then(json => console.log(json))
        .finally(() => {
            setLoading(false)
        })
    }, [])
    

    return (
        <div>
            <table>
                <tr>
                    <td></td>
                    <td>Nimi</td>
                    <td>Aika</td>
                    <td>Kilta</td>
                </tr>
                {users.map(player => (
                <tr key={player.id}>
                    <td>{player.name}</td>
                    <td>{player.time}</td>
                    <td>{player.guild}</td>
                </tr>
                ))}
            </table>
        </div>
    )
}

export default Leaderboard
