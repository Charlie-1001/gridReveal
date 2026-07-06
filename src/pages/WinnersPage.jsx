import styles from './WinnersPage.module.css';
import winnerText from '../assets/images/winner-text.png';
import firstBanner from '../assets/images/first-banner.png';
import secondBanner from '../assets/images/second-banner.png';
import thirdBanner from '../assets/images/third-banner.png';
import starPoppers from '../assets/images/stars-poppers.png';
import handshake from '../assets/images/handshake.png';
import { QuizContext } from '../contexts/QuizContext';
import { useContext, Fragment } from 'react';

function WinnersPage({teamData}) {
  const medals = [firstBanner, secondBanner, thirdBanner];

  let rank = 1;
  const sortedTeams = Object.values(teamData).sort((a, b) => b.score - a.score).reduce((group, team) => {
    const lastTeam = group[group.length - 1];
    if (lastTeam && lastTeam.score === team.score) {
      lastTeam.teams.push(team.name);
    } else {
      group.push({
        rank: rank,
        teams: [team.name],
        score: team.score,
      })
    }
    rank++;
    return group;
  }, [])

  console.log(sortedTeams);

  return (
    <main className={styles.winnersPage}>
      <img className={styles.winnerText} src={winnerText} alt='Winners Text' />

      <div className={styles.winnerGroup}>
        {
          sortedTeams.map((team, index) => {
            return (
              <div className={styles.winner} key={`winner${index}`}>
                <img className={styles.banner} src={medals[team.rank - 1]} alt={`${medals[team.rank - 1]} background image`} />
                <div className={styles.winnerData}>
                  {
                    team.teams.map((name, index) => (
                      <Fragment key={index}>
                        <h1>{name}</h1>
                        {index !== team.teams.length -1 && <img className={styles.handshake} src={handshake} alt='handshake image' />}
                      </Fragment>
                    ))
                  }
                  <h2>{team.score} pts</h2>
                </div>
              </div>
            )
          })
        }
      </div>

      <img className={styles.starPoppers} src={starPoppers} alt='stars poppers overlay' />
    </main>
  )
}

export default WinnersPage;
