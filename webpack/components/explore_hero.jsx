import React from "react"

const styles = {
  container: {
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    textAlign: "center",
  },
  label: {
    marginRight: "1.5rem",
  }
}

export default function(props) {
  return (
    <div style={styles.container}>
      <span style={styles.label}>Know what you want to build?</span>
      <a href={props.link} className="button">Create an App</a>
    </div>
  );
}
