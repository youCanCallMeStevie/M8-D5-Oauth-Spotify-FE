import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
//STYLE
import "./ModalPlaylist.scss";

const mapToStateToProps = (state) => state;

class ModalPlaylist extends PureComponent {
  render() {
    let playlist = this.props.user.playlists;
    let { show, toggle } = this.props;
    console.log(playlist);
    return (
      <Modal.Dialog
        style={{ display: show ? "" : "none" }}
        className="modal-playlist"
      >
        <Modal.Header>
          <Modal.Title>Playlist</Modal.Title>
          <button onClick={toggle}>x</button>
        </Modal.Header>

        <Modal.Body>
          {playlist.length > 0 ? (
            playlist.map((playlist) => {
              return <p>{playlist.name}</p>;
            })
          ) : (
            <p>No playlist, add one</p>
          )}
        </Modal.Body>
      </Modal.Dialog>
    );
  }
}
export default connect(mapToStateToProps)(ModalPlaylist);
