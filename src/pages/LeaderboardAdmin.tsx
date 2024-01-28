import '../styles.css'
import { useState } from 'react'


function LeaderboardAdmin() {
    const [inputs, setInputs] = useState([{ name: "", guild: "", time: 0 }]);
    const handleAddInput = () => {
        setInputs([...inputs, { name: "", guild: "", time: 0 }]);
    };
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { name, value } = event.target;
        let onChangeValue: {
            [key: string]: string | number;
            name: string;
            guild: string;
            time: number;
        }[] = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };
    const handleDeleteInput = (index: number) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    const postData = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa("ylikellotus:password"),
            },
            body: JSON.stringify(inputs)
        };
        fetch('http://localhost:3000', requestOptions)
            .then(res => res.json())
            .then(() => setInputs([{name: "", guild: "", time: 0}]))
    }

    return (
        <div className="container">
            {inputs.map((item, index) => (
                <div key={index}>
                    <div>
                        <input
                            name="name"
                            type="text"
                            value={item.name}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <input
                            name="guild"
                            type="text"
                            value={item.guild}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <input
                            name="time"
                            type="number"
                            value={item.time}
                            onChange={(event) => handleChange(event, index)}
                        />
                        <button disabled={inputs.length <= 1} onClick={() => handleDeleteInput(index)}>Delete</button>
                    </div>
                </div>
            ))}
            <button onClick={() => handleAddInput()}>Add</button>
            <button onClick={() => postData()}>Post</button>
        </div>
    );
}

export default LeaderboardAdmin
