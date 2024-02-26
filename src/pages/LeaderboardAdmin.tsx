import '../styles.css'
import { useState } from 'react'


function LeaderboardAdmin() {
    type Score = {
        name: string;
        guild: string;
        time: number;
    };

    const [scores, setScores] = useState<Score[]>([{ name: "", guild: "", time: 0 }]);
    const [authHash, setAuthHash] = useState<string>("");

    const handleAddScore = () => {
        setScores([...scores, { name: "", guild: "", time: 0 }]);
    };
    const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        const onChangeValue = [...scores];
        const newValue = name === 'time' ? parseInt(value) : value;
        onChangeValue[index] = { ...onChangeValue[index], [name]: newValue };
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
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + authHash,
            },
            body: JSON.stringify(scores)
        };
        fetch('https://ylikellotus.lajp.fi', requestOptions)
            .then(res => res.json())
            .then(() => setScores([{name: "", guild: "", time: 0}]))
            .catch((err) => alert("Error posting, try changing credentials. Full error: " + err));
    }

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
        </div>
    );
}

export default LeaderboardAdmin
