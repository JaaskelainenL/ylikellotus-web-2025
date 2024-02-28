import '../styles.css'
import React, { useEffect , useContext, useState} from 'react';
import { LocalizationContext } from '../context/context.tsx';

function Leaderboard() {

  const localization = useContext(LocalizationContext)

  const [tableData, setTableData] = React.useState<{ id: number, name: String, guild: String, time: number }[]>([]);
  const [error, setError] = React.useState<string | null>(null);
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
      .catch((error) => {
        console.error(error);
        setError("ERROR WITH FETCHING LEADERBOARD DATA");
      });
      
  }, []);
  return (
    <div className='scroll-container'>
      <img src='/ScrollTopNew.png' className='scroll-top' />
      <div className='scroll-center'>
        <div>
        {error !== null ? (
          <p>{error}</p>
        ) : (
          <div>
            {localization("leaderboardText")}
            {tableData.length == 0 ? 
              localization("noClockersText") :
              <table>
                {localization("leaderboardHeaders")}    
                <tbody>
                  {
                    tableData.slice(0,10000).map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.guild}</td>
                        <td>{(row.time/1000).toPrecision(4)} s</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            }
          </div>
        )}
        </div>
        <div className="scroll-bottom-padding" />
      </div>
      <img src='/ScrollBottomNew.png' className='scroll-bottom' />

    </div>
  )
}

export default Leaderboard
