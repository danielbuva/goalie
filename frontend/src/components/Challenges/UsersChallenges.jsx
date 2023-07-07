import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserChallenges } from "../../store/challenges"
import { useParams } from "react-router-dom"
import SingleChallenge from "./SingleChallenge";

export default function UsersChallenges(){
    const userChallenges = useSelector(state=> state.challenges.userChallenges);
    const dispatch = useDispatch();
    const {userId} = useParams();

    useEffect(()=>{
       dispatch(getUserChallenges(userId))
    },[dispatch, userId])

    return(
        <div>
            {userChallenges.map((challenge)=> (
                <SingleChallenge key={challenge.id} challenge={challenge}/>
            ))}
        </div>
    )
}
