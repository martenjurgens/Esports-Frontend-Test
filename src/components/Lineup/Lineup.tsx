import styles from 'components/Lineup/Lineup.module.scss'
import rostersJSON from 'data/rosters.json'
import playersJSON from 'data/players.json'

interface LineupProps {
  teamID: number
  textOnly?: boolean
}

export const Lineup = ({ teamID, textOnly }: LineupProps) => {
  const playerIDs: number[] = []

  // Question mark logo, if player doesn't have a picture
  const questionLogoUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Question-mark-grey.jpg/600px-Question-mark-grey.jpg?20160921200512'

  // Finds roster by team ID
  const rosterObj = rostersJSON.find(({ team }) => team.id === teamID)

  // Finds lineup from roster object and pushes player id's to array
  const { line_up } = rosterObj || {}
  line_up?.players.forEach(({ id }) => {
    playerIDs.push(id)
  })

  // Filters playersJSON to players array with player ID's
  const players = playersJSON.filter(({ id }) => playerIDs.includes(id))

  // Only returns names if textOnly boolean was true
  if (textOnly === true) {
    return (
      <>
        {players.map(({ nick_name, id }) => (
          <span className={styles.playerName} key={id}>
            {nick_name}
          </span>
        ))}
      </>
    )
  }

  return (
    <div className={styles.lineupContainer}>
      {players.map(({ nick_name, images, region, id }) => (
        <div className={styles.playerProfile} key={id}>
          <>
            <img
              src={images.length > 0 ? images[0].url : questionLogoUrl}
              alt={nick_name}
              className={styles.playerImg}
            />
          </>

          <div className={styles.nick}>
            <img
              src={region.country.images[0].url}
              alt={region.country.name}
              className={styles.countryFlagImg}
            />
            <span>{nick_name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
