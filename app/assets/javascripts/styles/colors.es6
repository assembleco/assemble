const colors = {
  green: "#acdbcc",
  blue: "#9bcad6",
  yellow: "#f2d38e",
  red: "#fb987f",
}

const border_size = "4px";

function border_for_app_id(id) {
  const border_id = (id - 1) % 4 + 1;
  const border_color = Object.values(colors)[border_id];

  return {
    border: [
      border_size,
      "solid",
      border_color
    ].join(" "),
    borderRadius: border_size,
  };
}

export default border_for_app_id;
