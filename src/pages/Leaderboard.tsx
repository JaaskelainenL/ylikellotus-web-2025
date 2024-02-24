import '../styles.css'
import React, { useEffect , useContext} from 'react';
import { LocalizationContext } from '../context/context.tsx';

function Leaderboard() {

  const localization = useContext(LocalizationContext)

  const [tableData, setTableData] = React.useState<{ id: number, name: String, guild: String, time: number }[]>([]);
  useEffect(() => {
    fetch("https://ylikellotus.lajp.fi")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        return res.json();
      })
      .then((res) => {
        console.log("Leaderbopard: ", res);
        setTableData(res);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className='scroll-container'>
      <img src='/ScrollTopNew.png' className='scroll-top' />
      <div className='scroll-center'>
        <div>
        {tableData !== null ? (
          <table>
            {localization("leaderboardHeaders")}    
            <tbody>
              {tableData.slice(0,10000).map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.guild}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading leaderboard</p>
        )}
        </div>
        <div className="scroll-bottom-padding" />
      </div>
      <img src='/ScrollBottomNew.png' className='scroll-bottom' />

    </div>
  )
}

export default Leaderboard
