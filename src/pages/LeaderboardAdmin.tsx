import '../styles.css'
import { useEffect, useState } from 'react'


function LeaderboardAdmin() {
    type Score = {
        id?: number;
        name: string;
        guild: string;
        time: number;
    };

    const [scores, setScores] = useState<Score[]>([{ name: "", guild: "", time: 0 }]);
    const [data, setData] = useState<Score[]>([]);
    const [authHash, setAuthHash] = useState<string>("");

    const handleAddScore = () => {
        setScores([...scores, { name: "", guild: "", time: 0 }]);
    };
    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        const onChangeValue = [...scores];
        onChangeValue[index] = { ...onChangeValue[index], [name]: value};
        setScores(onChangeValue);
    };
    const handleDeleteScore = (index: number) => {
        const newArray = [...scores];
        newArray.splice(index, 1);
        setScores(newArray);
    };

    // definitely secure authentication
    const enterCredentials = () => {
        const user = prompt("Enter username:");
        if(user == null) {
            return;
        }
        const pwd = prompt("Enter password:");
        setAuthHash(btoa(user + ':' + pwd));
    }

    const postScores = () => {
        const body = scores.map(s => {
            return { ...s, time: Math.round(parseFloat(s.time.toString().replace(',', '.'))*1000) }
        })
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + authHash,
            },
            body: JSON.stringify(body)
        };
        fetch('https://ylikellotus.lajp.fi', requestOptions)
            .then(res => res.json())
            .then(() => { setScores([{name: "", guild: "", time: 0}]); getScores() })
            .catch((err) => alert("Error posting, try changing credentials. Full error: " + err));
    }

    const getScores = () => {
        fetch("https://ylikellotus.lajp.fi")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch leaderboard data");
                }
                return res.json();
            })
            .then((res) => setData(res))
            .catch((err) => alert("Error fetching data, error: " + err));
    }
    const removeScore = (id: number) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + authHash,
            },
            body: JSON.stringify({id: id})
        };
        fetch("https://ylikellotus.lajp.fi", requestOptions)
            .then((res) => {
                if (!res) { 
                    throw new Error("Deletion failed")
                } 
                res.json()
            })
            .then(() => setData(data.filter(e => e.id !== id)))
            .catch((err) => alert("Couldn't remove score " + id + ": " + err));
    };

    useEffect(getScores, [])

    return (
        <div className="container admin">
            {scores.map((item, index) => (
                <div key={index}>
                    <div>
                        <input
                            name="name"
                            type="text"
                            value={item.name}
                            onChange={(event) => handleScoreChange(event, index)}
                        />
                        <input
                            name="guild"
                            type="text"
                            value={item.guild}
                            onChange={(event) => handleScoreChange(event, index)}
                        />
                        <input
                            name="time"
                            type="number"
                            value={item.time}
                            onChange={(event) => handleScoreChange(event, index)}
                        />
                        <button disabled={scores.length <= 1} onClick={() => handleDeleteScore(index)}>Delete</button>
                    </div>
                </div>
            ))}
            <button onClick={handleAddScore}>Add clocker</button>
            <button onClick={postScores}>Send</button>
            <button onClick={enterCredentials}>Change credentials</button>
            <table style={{ width: "50%", color: "white" }}>
                <thead>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Guild</th>
                    <th>Time</th>
                    <th>Remove</th>
                </thead>
                <tbody>
                {data.map(score => (
                    <tr key={score.id}>
                        <td>{score.id}</td>
                        <td>{score.name}</td>
                        <td>{score.guild}</td>
                        <td>{(score.time/1000).toFixed(3)} s</td>
                        <td><button onClick={() => removeScore(score.id ?? 0)}>Delete</button></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardAdmin
