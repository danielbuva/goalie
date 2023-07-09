export const social = <i className="fa-solid fa-people-group"/>;
export const fitness = <i className="fa-solid fa-dumbbell"/>;
export const health = <i className="fa-solid fa-heart-pulse"/>;
export const diet = <i className="fa-solid fa-burger"/>;
export const finance = <i className="fa-solid fa-money-bill-1-wave"/>;
export const study = <i className="fa-solid fa-book"/>;
export const misc = <i className="fa-solid fa-list"/>;

function displaySelectedIcon(image) {
    if(image === "social") return social;
    if(image === "fitness") return fitness;
    if(image === "health") return health;
    if(image === "diet") return diet;
    if(image === "finance") return finance;
    if(image === "study") return study;
    if(image === "misc") return misc;
    return;
  };

  export default displaySelectedIcon;
