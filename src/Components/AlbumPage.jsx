import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faHeart,
  faPauseCircle,
  faPlay,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./CSS/AlbumPage.css";
import { Image, Table, Spinner, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { selectedSong } from "../store/player/actions";
import UserBanner from "./UserBanner";
import { getAlbum } from "../api/index";

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  handleSelectedSong: (track, album) =>
    dispatch(selectedSong({ ...track, album: album })),
});
export class AlbumPage extends Component {
  state = {
    album: {},
    loading: true,
    error: false,
    // albumId: this.props.match.params.id
  };
  duration = (time) => {
    const min = time / 60;
    return min <= 60
      ? `${Math.floor(min)} MIN`
      : `${Math.floor(min / 60)} HR ${min} MIN}`;
  };

  durationTrack = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min.toString()}`;
    }
    let sec = (time % 60).toString();
    if (sec < 10) {
      sec = `0${sec.toString()}`;
    }
    return min + ":" + sec;
  };
  fetchAlbum = async () => {
    let albumID = this.props.match.params.id;
    const result = await getAlbum(albumID);
    if (result) {
      this.setState({ album: result, loading: false });
    } else {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidMount = () => {
    this.fetchAlbum();
  };
  // componentDidMount = async (albumId) => {
  //   this.setState({ loading: true });
  //  const artistAlbum= await getAlbum(albumId);
  //  this.setState({album: artistAlbum})
  //   this.setState({ loading: false });
  //   console.log(artistAlbum)
  // };

  render() {
    const { album, loading } = this.state;
    return (
      <>
        <UserBanner />
        {loading ? (
          <Spinner animation="border" variant="white" size="lg" />
        ) : (
          album && (
            <Row>
              <div className="albums-holder col-9" style={{ padding: "0px" }}>
                <section id="albums-section" style={{ overflowY: "auto" }}>
                  <div className="album row">
                    <div className="col-12 col-md-6 col-lg-4">
                      <Image
                        className="album-cover img-fluid"
                        src={album?.cover_big}
                        alt="album cover"
                      />
                    </div>
                    <div className="album-details col-12 col-md-6 col-lg-8">
                      <h4 className="mt-2">album</h4>
                      <h2 id="albumName">{album?.title}</h2>
                      <div className="mt-4 last-line">
                        <Link
                          to={`/artist/${album?.artist.id}/${album?.artist.name}`}
                        >
                          <img
                            src={album?.artist.picture_small}
                            alt={album?.artist.name}
                            className="group-img"
                          />
                          <h6>
                            <span lassName="group-name">
                              {` ${album?.artist.name}`}
                            </span>
                          </h6>
                        </Link>
                        <p className="album-length">
                          {album?.release_date.substr(0, 4) + " • "}
                          {album?.nb_tracks + " SONGS"}
                          {", " + this.duration(album?.duration)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="playlist" style={{ width: "100%" }}>
                    <div className="playlist-btns mt-3 mb-3">
                      <faPauseCircle
                        icon={faPauseCircle}
                        className="fas fa-pause-circle fa-3x"
                      />
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="far fa-heart fa-2x mr-3 ml-3"
                      />
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="fa fa-ellipsis-h fa-2x"
                      />
                    </div>

                    <Table className="playlist-table table-borderless">
                      <thead>
                        <tr>
                          <th scope="col th-sm">#</th>
                          <th scope="col th-lg" style={{ paddingLeft: "50px" }}>
                            Title
                          </th>
                          <th scope="col th-sm">
                            <FontAwesomeIcon icon={faClock} />
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {album.tracks.data.map((track, index) => (
                          <tr
                            key={track.id}
                            className="songRow"
                            onClick={() =>
                              this.props.handleSelectedSong(track, album)
                            }
                          >
                            <td style={{ verticalAlign: "middle" }}>
                              <span className="track-num px-2">{index}</span>
                              <FontAwesomeIcon
                                icon={faPlay}
                                size="2x"
                                className="track-play play-track-btn"
                              />
                            </td>
                            <td>
                              <ul>
                                <li className="song">{track.title}</li>
                                <li>
                                  <Link
                                    to={`/artist/${track.artist.id}/${track.artist.name}`}
                                    className="group"
                                    style={{ verticalAlign: "middle" }}
                                  >
                                    {track.artist.name}
                                  </Link>
                                </li>
                              </ul>
                            </td>
                            <td>
                              {(track.duration / 60)
                                .toFixed(2)
                                .toString()
                                .replace(".", ":")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <p className="playlist-footer">
                      {album.release_date.substr(0, 4)} {album.label}
                    </p>
                  </div>
                </section>
              </div>
            </Row>
          )
        )}
      </>
    );
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AlbumPage)
);
