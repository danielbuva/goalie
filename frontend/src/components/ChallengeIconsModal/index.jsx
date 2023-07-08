import "./index.css"

export default function ChallengeIconsModal() {
    const social = <i className="fa-solid fa-people-group"/>;
    const fitness = <i className="fa-solid fa-dumbbell"/>;
    const health = <i className="fa-solid fa-heart-pulse"/>;
    const diet = <i className="fa-solid fa-burger"/>;
    const finance = <i className="fa-solid fa-money-bill-1-wave"/>;
    const study = <i className="fa-solid fa-book"/>;
    const misc = <i className="fa-solid fa-list"/>;


    return (
        <div className="icons-modal-wrapper">
            <h2 className="icons-header">Select Your Challenge Icon</h2>
            <div className="icons-wrapper">
                {social}
                {fitness}
                {health}
                {diet}
                {finance}
                {study}
            </div>
                {misc}
        </div>
    )
};
