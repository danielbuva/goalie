import FollowsBox from "../Follows"


export default function OneChallengeParticipants({ challenge, type }) {

    let arr = challenge.allParticipants.filter(participant => participant.completed === type)

    return(
        <div className="OneChallengeParticipants_Wrapper">
            {arr.map(participant => <FollowsBox key={participant.userId} user={participant.user}/>)}
        </div>
    )
}
