function More({ isActive }) {
  return isActive ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 21 22"
    >
      <path
        className="icon"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3661 21.1073C16.0264 21.1073 20.615 16.5187 20.615 10.8584C20.615 5.19813 16.0264 0.609558 10.3661 0.609558C4.70579 0.609558 0.117218 5.19813 0.117218 10.8584C0.117218 16.5187 4.70579 21.1073 10.3661 21.1073ZM10.2564 12.0385C10.9649 12.0385 11.5392 11.4642 11.5392 10.7557C11.5392 10.0472 10.9649 9.4729 10.2564 9.4729C9.54791 9.4729 8.97358 10.0472 8.97358 10.7557C8.97358 11.4642 9.54791 12.0385 10.2564 12.0385ZM16.4096 10.751C16.4096 11.4601 15.8348 12.0349 15.1257 12.0349C14.4167 12.0349 13.8419 11.4601 13.8419 10.751C13.8419 10.042 14.4167 9.46716 15.1257 9.46716C15.8348 9.46716 16.4096 10.042 16.4096 10.751ZM5.39116 12.0363C6.1006 12.0363 6.67571 11.4612 6.67571 10.7517C6.67571 10.0423 6.1006 9.46716 5.39116 9.46716C4.68172 9.46716 4.10661 10.0423 4.10661 10.7517C4.10661 11.4612 4.68172 12.0363 5.39116 12.0363Z"
      />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="icon"
        d="M3.75 12C3.75 7.44 7.44 3.75 12 3.75C16.56 3.75 20.25 7.44 20.25 12C20.25 16.56 16.56 20.25 12 20.25C7.44 20.25 3.75 16.56 3.75 12ZM12 1.75C6.34 1.75 1.75 6.34 1.75 12C1.75 17.66 6.34 22.25 12 22.25C17.66 22.25 22.25 17.66 22.25 12C22.25 6.34 17.66 1.75 12 1.75ZM7.25 13.25C7.94 13.25 8.5 12.69 8.5 12C8.5 11.31 7.94 10.75 7.25 10.75C6.56 10.75 6 11.31 6 12C6 12.69 6.56 13.25 7.25 13.25ZM16.75 13.25C17.44 13.25 18 12.69 18 12C18 11.31 17.44 10.75 16.75 10.75C16.06 10.75 15.5 11.31 15.5 12C15.5 12.69 16.06 13.25 16.75 13.25ZM13.25 12C13.25 12.69 12.69 13.25 12 13.25C11.31 13.25 10.75 12.69 10.75 12C10.75 11.31 11.31 10.75 12 10.75C12.69 10.75 13.25 11.31 13.25 12Z"
      />
    </svg>
  );
}

export default More;