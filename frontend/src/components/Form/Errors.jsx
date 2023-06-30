import Warning from "./assets/Warning.svg";

const WarningIcon = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "46px",
        backgroundColor: "#FD642D",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={Warning}
        alt="error"
        style={{ width: "24px", height: "22px" }}
      />
    </div>
  );
};

const FromErrors = ({ errors }) => {
  const messages = [];
  const errorKeys = Object.keys(errors);
  const errorsLength = errorKeys.length;

  if (errorsLength < 1) return null;

  for (let i = 0; i < errorsLength; i++) {
    let error = errors[errorKeys[i]];
    error = error.message ?? error;
    messages.push(
      <p
        key={i}
        style={{
          fontSize: "15px",
          paddingLeft: "8px",
          margin: 0,
        }}
      >
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        height: `${50 + 12 * messages.length}px`,
        width: "100%",
        border: "solid 1px #ebebeb",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        borderRadius: "12px",
        margin: "5px 0px 10px 0px",
      }}
    >
      <WarningIcon />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messages}
      </div>
    </div>
  );
};

export default FromErrors;
