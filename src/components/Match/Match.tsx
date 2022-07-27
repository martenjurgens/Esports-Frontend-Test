import teamsJSON from 'data/teams.json'
import rostersJSON from 'data/rosters.json'
import seriesJSON from 'data/series.json'
import styles from 'components/Match/Match.module.scss'
import { RosterContext } from 'components/TeamStanding/TeamStanding'
import { useContext } from 'react'

interface MatchProps {
  matchID: number
}

export const Match = ({ matchID }: MatchProps) => {
  const rosterID = useContext(RosterContext)
  const matchObj = seriesJSON.find((match) => match.id === matchID)

  let team1 = matchObj?.participants[0]
  let team2 = matchObj?.participants[1]

  // Swaps team order if necessary, so the team order stays consistent
  if (team2?.roster.id === rosterID) {
    [team1, team2] = [team2, team1]
  }

  // Finds team's ID based on roster ID
  const teamID1 = rostersJSON.find((roster) => roster.id === team1?.roster.id)
    ?.team.id
  const teamID2 = rostersJSON.find((roster) => roster.id === team2?.roster.id)
    ?.team.id

  const getLogoUrl = (teamID: number) => {
    if (teamID) {
      return teamsJSON.find((team) => team.id === teamID)?.images[0].url
    }
  }

  const renderDate = () => {
    if (matchObj) {
      return new Date(matchObj.start).toLocaleDateString('en-US')
    }
  }

  const renderTeamAbbr = (teamID?: number) => {
    const teamAbbr = teamsJSON.find((team) => team.id === teamID)?.abbreviation
    return teamID ? teamAbbr : '?'
  }

  const renderScores = () => {
    return team1?.score + ' : ' + team2?.score
  }

  return (
    <div className={styles.match}>
      <div className={styles.date}>{renderDate()}</div>
      <div className={styles.matchDetails}>
        {teamID1 && (
          <img
            src={getLogoUrl(teamID1)}
            alt={renderTeamAbbr(teamID1)}
            className={styles.teamLogo}
          />
        )}
        <div className={styles.teamName}>{renderTeamAbbr(teamID1)}</div>
        <div className={styles.scores}>{renderScores()}</div>
        <div className={styles.teamName}>{renderTeamAbbr(teamID2)}</div>
        {teamID2 && (
          <img
            src={getLogoUrl(teamID2)}
            alt={renderTeamAbbr(teamID2)}
            className={styles.teamLogo}
          />
        )}
      </div>
    </div>
  )
}
