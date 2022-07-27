import seriesJSON from 'data/series.json'
import { Match } from 'components/Match/Match'
import styles from 'components/Matches/Matches.module.scss'
import { RosterContext } from 'components/TeamStanding/TeamStanding'
import { useContext } from 'react'

export type MatchType = typeof seriesJSON[5]

export const Matches = () => {
  const upcomingMatches: number[] = []
  const pastMatches: number[] = []
  const rosterID = useContext(RosterContext)

  // Finds team's matches with rosterID
  const matches = seriesJSON.filter(({ participants }) =>
    participants.some(({ roster }) => roster.id === rosterID)
  )

  // Filters matches to past and upcoming matches based on match date and current date
  if (matches) {
    matches.forEach((match) => {
      if (match.deleted_at === null) {
        const startDate = new Date(match.start)
        const currentDate = new Date()
        startDate > currentDate
          ? upcomingMatches.push(match.id)
          : pastMatches.push(match.id)
      }
    })
  }

  return (
    <div className={styles.matchesContainer}>
      <div className={styles.pastMatches}>
        {pastMatches.map((matchID) => {
          return <Match matchID={matchID} key={matchID} />
        })}
      </div>
      <div className={styles.upcomingMatches}>
        {upcomingMatches.map((matchID) => {
          return <Match matchID={matchID} key={matchID} />
        })}
      </div>
    </div>
  )
}
