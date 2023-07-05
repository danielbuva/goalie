import Avatar from "../Avatar";
import useSessionUser from "../../hooks/useSessionUser";
import "./Follows.css"

export default function FollowsBox({ user }) {
    let currUser = useSessionUser();
    const isUser = currUser.id === user.id;

    const following = currUser.following.find(follower => follower.id === user.id)

    return (
        <div className="FollowsList_Wrapper">
            <div>
                <Avatar/>
            </div>
            <div className="FollowsList_middle_holder">
                <div className="FollowsList_title">
                    {user.name}
                </div>
                <div className="FollowsList_id">
                    @{user.id}
                </div>
                <div className="FollowsList_bio">
                    {user.bio.slice(0, 30)}
                    {user.bio.length > 30 ? "..." : null}
                </div>
            </div>
            {!isUser && (
                <button
                className="FollowsList_follow_btn"
                >{following ? "Following" : "Follow"}</button>
            )}
        </div>
    )
}
