import styles from 'components/Standings/Standings.module.scss'
import { TeamStanding } from 'components/TeamStanding/TeamStanding'
import teamsJSON from 'data/teams.json'

export const Standings = () => {
  // Sorts teams by Dota Pro Circuit points in descending order
  const sortedTeamsData = teamsJSON.sort((a, b) =>
    a.dpc_points < b.dpc_points ? 1 : -1
  )

  return (
    <main className={styles.container}>
      {sortedTeamsData.map(({ id, name, images, dpc_points }, index) => {
        return (
          <TeamStanding
            key={id}
            teamPlacement={index + 1}
            teamID={id}
            teamName={name}
            teamLogoUrl={images[0].url}
            teamPoints={dpc_points}
          />
        )
      })}
    </main>
  )
}
