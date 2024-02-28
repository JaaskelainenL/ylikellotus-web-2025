import '../styles.css'
import React, { useEffect , useContext } from 'react';
import { LocalizationContext } from '../context/context.tsx';

function Leaderboard() {
  type Score = {
    id?: number;
    name: string;
    guild: string;
    time: number;
  };
  type Guild = {
    name: string;
    total: number;
    average: number;
    median: number;
    scores: Score[];
  }

  const localization = useContext(LocalizationContext)

  const [tableData, setTableData] = React.useState<Score[]>([]);
  const [guilds, setGuilds] = React.useState<Guild[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    refreshScores();
  }, []);
  const refreshScores = () => {
    fetch("https://ylikellotus.lajp.fi")
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
        setError("ERROR WITH FETCHING LEADERBOARD DATA: " + error);
      });
    setTimeout(refreshScores, 5000);
  }

  const grouped = (data: Score[]) => {
    let result: Guild[] = []
    data.forEach((s: Score) => {
      const guild = s.guild.toUpperCase().replace('TIK', 'TiK').replace('ATHENE', 'Athene').replace('PRODEKO', 'Prodeko').replace('INKUBIO', 'Inkubio');
      const g = result.find(g => g.name === guild)
      if(g === undefined) {
        result.push({name: guild, scores: [s], average: 0, median: 0, total: 0})
      } else {
        g.scores.push(s)
      }
    })
    result.forEach((g: Guild) => {
      g.average = g.scores.reduce((acc, c) => acc + c.time, 0) / g.scores.length;
      g.median = g.scores[Math.floor(g.scores.length / 2)].time;
      g.total = g.scores.length;
    })
    return result;
  }

  return (
    <div style={{width: "95%"}} className='scroll-container'>
      <img src='/ScrollTopNew.png' className='scroll-top' />
      <div className='scroll-center'>
        <div>
          {localization("guildsText")}
          <table>
            {localization("guildsHeader")}
            <tbody>
              {guilds.sort((a,b) => a.average - b.average).slice(0,5).map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.total}</td>
                    <td>{((row.average ?? 0)/1000).toFixed(2)} s</td>
                    <td>{((row.median ?? 0)/1000).toFixed(2)} s</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
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
                    tableData.slice(0,50).map((row) => (
                      <tr key={row.id}>
                        <td>{row.name}</td>
                        <td>{row.guild.toUpperCase().replace('TIK', 'TiK').replace('ATHENE', 'Athene').replace('PRODEKO', 'Prodeko').replace('INKUBIO', 'Inkubio')}</td>
                        <td>{(row.time/1000).toFixed(2)} s</td>
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
