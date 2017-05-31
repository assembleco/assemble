import $ from "jquery"

const updateBlock = (blockAttrs, user_handle, blockname) => {
  $.ajax({
    url: `/blocks/${user_handle}/${blockname}.json`,
    data: { block: blockAttrs },
    type: "PATCH",
    success: () => { console.log("Updated"); }
  });
}

export default updateBlock;
