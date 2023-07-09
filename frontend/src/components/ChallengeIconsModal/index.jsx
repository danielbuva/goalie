import { useModal } from "../../hooks/useModal";
import { social, fitness, health, diet, finance, study, misc } from "../../hooks/useIcons";
import "./index.css"

// export const social = <i className="fa-solid fa-people-group"/>;
// export const fitness = <i className="fa-solid fa-dumbbell"/>;
// export const health = <i className="fa-solid fa-heart-pulse"/>;
// export const diet = <i className="fa-solid fa-burger"/>;
// export const finance = <i className="fa-solid fa-money-bill-1-wave"/>;
// export const study = <i className="fa-solid fa-book"/>;
// export const misc = <i className="fa-solid fa-list"/>;

export default function ChallengeIconsModal({ selectedIcon }) {
    const { closeModal } = useModal();

    const handleClick = iconValue => {
        selectedIcon(iconValue);
        closeModal();
    }

    return (
        <div className="icons-modal-wrapper">
            <h2 className="icons-header">Select Your Challenge Icon</h2>
            <div className="icons-wrapper">
                <div onClick={() => handleClick("social")}>{social}</div>
                <div onClick={() => handleClick("fitness")}>{fitness}</div>
                <div onClick={() => handleClick("health")}>{health}</div>
                <div onClick={() => handleClick("diet")}>{diet}</div>
                <div onClick={() => handleClick("finance")}>{finance}</div>
                <div onClick={() => handleClick("study")}>{study}</div>
            </div>
                <div onClick={() => handleClick("misc")}>{misc}</div>
        </div>
    )
};
