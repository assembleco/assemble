import NewConnection from "components/app_canvas/new_connection.es6"

const Connection = function(props) {
  return (
    <div>
       <div className="app-canvas-connection"></div>

       <div className="app-canvas-block-element">
         <img src={"/assets/" + props.icon} />
         { props.name }
       </div>

       { props.connections.map((connection, index) =>
           connection
           ? <Connection key={index} {...connection} all_blocks={props.all_blocks} app_id={props.app_id} />
           : ""
       ) }

       { props.connections.length == 0 && <NewConnection all_blocks={props.all_blocks} app_id={props.app_id} source_id={props.id} source_type="Block" /> }
    </div>
  );
}

export default Connection;
