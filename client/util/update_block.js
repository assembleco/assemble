import $ from "jquery"

const updateBlock = (blockAttrs, block_id) => {
  $.ajax({
    url: `/blocks/${block_id}.json`,
    data: { block: blockAttrs },
    type: "PATCH",
    success: () => { console.log("Updated"); }
  });
}

export default updateBlock;
