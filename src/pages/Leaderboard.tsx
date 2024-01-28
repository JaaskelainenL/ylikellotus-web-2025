import '../styles.css'
import { useEffect, useState} from "react"

function Leaderboard() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch("https://ylikellotus.lajp.fi/")
        .then(response => response.json())
        .then(json => setUsers(json))
        .finally(() => {
            setLoading(false)
        })
    }, [])
    

    return (
        <div>
            <table>
                <tr>
                    <td>Nimi</td>
                    <td>Aika</td>
                    <td>Kilta</td>
                </tr>
                {users.slice(0,5).map(player => (
                <tr>
                    <td>{player.name}</td>
                    <td>{(player.time / 1000).toString() + "s"}</td>
                    <td>{player.guild}</td>
                </tr>
                ))}
            </table>
        </div>
    )
}

export default Leaderboard
