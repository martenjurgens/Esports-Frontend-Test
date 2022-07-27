import { useState } from 'react'
import clsx from 'clsx'
import rostersJSON from 'data/rosters.json'
import { AiOutlineDown } from 'react-icons/ai'
import { Matches } from 'components/Matches/Matches'
import { Lineup } from 'components/Lineup/Lineup'
import styles from 'components/TeamStanding/TeamStanding.module.scss'
import React from 'react'

export const RosterContext = React.createContext<number | undefined>(undefined)

interface StandingProps {
  teamPlacement: number
  teamID: number
  teamName: string
  teamPoints: number
  teamLogoUrl: string
}

export const TeamStanding = ({
  teamPlacement,
  teamID,
  teamName,
  teamPoints,
  teamLogoUrl,
}: StandingProps) => {
  // State for accordion
  const [isActive, setIsActive] = useState(false)

  // Checks if team is qualified/invited to The International
  const isInvited = teamPoints >= 500 && teamPlacement

  // Finds roster's ID with team ID
  const rosterID = rostersJSON.find(({ team }) => team.id === teamID)?.id

  return (
    <div className={styles.root}>
      <button
        className={clsx(styles.standing, isActive && styles.active)}
        onClick={() => setIsActive(!isActive)}>
        <div
          className={clsx(
            styles.indicator,
            isInvited ? styles.invitedIndicator : styles.uninvitedIndicator
          )}
        />
        <div className={styles.placement}>{teamPlacement}</div>
        <div className={styles.info}>
          <div className={styles.dpc}>{teamPoints}</div>
          <div className={styles.logo}>
            <img
              src={teamLogoUrl}
              className={styles.logoimg}
              alt={teamName + ' logo'}
            />
          </div>
          <div className={styles.name}>{teamName}</div>
        </div>
        <div className={styles.roster}>
          <Lineup teamID={teamID} textOnly={true} />
        </div>
        <div className={styles.accordionIcon}>{<AiOutlineDown />}</div>
      </button>
      {isActive && (
        <div className={styles.accordionContainer}>
          <Lineup teamID={teamID} />
          <RosterContext.Provider value={rosterID}>
            {<Matches />}
          </RosterContext.Provider>
        </div>
      )}
    </div>
  )
}
