import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Image, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPlay,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/AlbumCard.css";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";

//ACTIONS IMPORTS
import { likedSong } from "../store/user/action.js";
import { selectedSong } from "../store/player/actions";
const maptoStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  handleSelectedSong: (track, album) =>
    dispatch(selectedSong({ ...track, album: album })),
    likeSong: (song) =>
    dispatch((dispatch, getState) => {
      let songInfo = { ...song, added: new Date() };
      dispatch(likedSong(songInfo));
    }),

  });



export class AlbumCard extends Component {
  state = {
    showBtn: false,
  };

  showBtn = () => {
    this.setState({ showBtn: !this.state.showBtn });
  };

  render() {
    console.log(this.props);
    return (
      //   <div className="row no-gutters d-flex">       <Col className="mb-2">

      <Col className="myCard card trending mb-4" id="sampleCard">
        <div>
          <h6>
            <Link to={`/album/${this.props.id}`}>
              {this.props.albumTitle.length > 20
                ? this.props.albumTitle.slice(0, 20) + "..."
                : this.props.albumTitle}
            </Link>
          </h6>
          <h6>
            <Link to={`/artist/${this.props.artistId}/${this.props.artist}`}>
              {this.props.artist}
            </Link>
          </h6>
        </div>
        <Image
          src={this.props.img}
          className="card-img-top"
          alt="album cover"
        />

        <FontAwesomeIcon
          className="spotify-card-icon fab fa-spotify"
          icon={faSpotify}
        />
        <span className="overlay-icons">
          <FontAwesomeIcon
            className="heart far fa-heart fa-sm mr-3"
            icon={faHeart}
            onClick={() => this.props.likeSong(this.props.album)}
          />
          <FontAwesomeIcon
            className="play fas fa-play fa-1x mr-3"
            icon={faPlay}
            // onClick={() =>
            //   this.props.handleSelectedSong(track, this.props.album)}
          />
          <FontAwesomeIcon
            className="fa fa-ellipsis-h fa-sm"
            icon={faEllipsisH}
            onClick={() => this.showBtn()}
          />
          <button
            id="add-to-playlist"
            style={{ display: this.state.showBtn ? "block" : "none" }}
          >
            Add Playlist
          </button>
        </span>
      </Col>

      //   </div>
    );
  }
}

export default withRouter(connect(maptoStateToProps, mapDispatchToProps)(AlbumCard));
