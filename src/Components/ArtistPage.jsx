import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CSS/ArtistPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image, Alert } from "react-bootstrap";

//UTILITIES IMPORTS
import { getSearch, getArtist } from "../api";

// import Background from "../assets/rock-concert.jpg";
import Gallery from "./Gallery";
import UserBanner from "./UserBanner";

export class ArtistPage extends Component {
  state = {
    artistInfo: {},
    artistAlbums: [],
    loading: true,
    error: false,
  };

  fetchArtist = async () => {
    const artistId = this.props.match.params.id;
    const result = await getArtist(artistId);
    if (result) {
      this.setState({
        artistInfo: result,
        loading: false,
      });
    } else {
      this.setState({ loading: false, error: true });
      <Alert variant="danger">Something went wrong!</Alert>;
    }
  };

  fetchArtistAlbums = async () => {
    const artistName = this.props.match.params.name;
    const result = await getSearch(artistName);
    console.log(result);
    if (result) {
      this.setState({
        artistAlbums: result.data,
        loading: false,
      });
    } else {
      this.setState({ loading: false, error: true });
      <Alert variant="danger">Something went wrong!</Alert>;
    }
  };

  // fetchTopFifty = async () => {
  //   let topTracks = this.state.artistInfo.tracklist;
  //   console.log(topTracks)
  //   try {
  //     let response = await fetch(
  //       topTracks,
  //       {
  //         method: "GET",
  //         headers: {
  //           "x-rapidapi-key":
  //             "91cbdcb779mshb25e7872769b4fcp110c07jsnbcf1d17bc30b",
  //           "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  //         },
  //       }
  //     );
  //     let trackList = await response.json();
  //     console.log(trackList);
  //     if (response.ok) {
  //       this.setState({
  //         trackList: trackList,
  //         loading: false,
  //       });
  //     } else {
  //       this.setState({ loading: false, error: true });
  //       <Alert variant="danger">Something went wrong!</Alert>;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({ loading: false, error: true });
  //   }
  // };

  componentDidMount() {
    this.fetchArtist();
    this.fetchArtistAlbums();
  }
  render() {
    const { artistInfo } = this.state;
    return (
      <>
        <UserBanner />
        <div className="mainframe">
          <div className="main-content">
            {/* <Image src={Background} /> */}
            <Image src={artistInfo.picture_xl} />

            <div className=" mt-3 justify-center">
              <div className="jumbotron d-flex justify-content-center flex-column">
                <h6>{artistInfo.nb_fan} MONTHLY LISTENERS</h6>
                <h1 className="display-4">{artistInfo.name}</h1>
                <div className="d-flex d-md-none row justify-content-center">
                  <a
                    className="artist-pg-follow-btn btn btn-outline-light btn-lg"
                    href="#"
                    role="button"
                  >
                    PLAY
                  </a>
                  <a
                    className="artist-pg-follow-btn btn btn-outline-light btn-lg"
                    href="#"
                    role="button"
                  >
                    FOLLOW
                  </a>
                </div>
                <div className="d-none d-md-flex column ">
                  <a
                    className="artist-pg-follow-btn btn btn-outline-light btn-lg "
                    href="#"
                    role="button"
                  >
                    PLAY
                  </a>
                  <a
                    className="artist-pg-follow-btn btn btn-outline-light btn-lg"
                    href="#"
                    role="button"
                  >
                    FOLLOW
                  </a>
                </div>
              </div>
            </div>

            <div>
              <ul
                className="nav nav-tabs justify-content-center"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item d-none d-md-flex" role="presentation">
                  <a
                    className="nav-link"
                    id="trending-tab"
                    data-toggle="tab"
                    href="#trending"
                    role="tab"
                    aria-controls="trending"
                    aria-selected="true"
                    data-target="#homepage-headings"
                    data-slide-to="0"
                  >
                    OVERVIEW
                  </a>
                </li>
                <li className="nav-item d-none d-md-flex" role="presentation">
                  <a
                    className="nav-link"
                    id="podcast-tab"
                    data-toggle="tab"
                    href="#podcast"
                    role="tab"
                    aria-controls="podcast"
                    aria-selected="false"
                    data-target="#homepage-headings"
                    data-slide-to="1"
                  >
                    RELATED ARTISTS
                  </a>
                </li>
                <li className="nav-item d-none d-md-flex" role="presentation">
                  <a
                    className="nav-link"
                    id="moods-and-genres-tab"
                    data-toggle="tab"
                    href="#moods-and-genres"
                    role="tab"
                    aria-controls="moods-and-genres"
                    aria-selected="false"
                    data-target="#homepage-headings"
                    data-slide-to="2"
                  >
                    ABOUT
                  </a>
                </li>

                {/* <button className="dropdown-toggle d-md-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style ="background: transparent;
      font-size: 10px;
      border: none;
      color: whitesmoke;
      font-weight: 500;
      letter-spacing: 0.1em;
      margin-bottom: 22px;
      margin-left: 5px;">
        MORE
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" href="#">OVERVIEW</a>
        <a className="dropdown-item" href="#">RELATED ARTIST</a>
        <a className="dropdown-item" href="#">ABOUT</a>
      </div> */}
              </ul>
            </div>
            <>
              <Gallery
                title={artistInfo.name}
                loading={this.state.loading}
                Albums={this.state.artistAlbums}
                comments={this.state.comments}
                // fetchComments={this.fetchComments}
                // handleOpenModal={this.handleOpenModal}
                // selectedMovieID={this.handleSelectedMovie}
              />
            </>
          </div>
        </div>
      </>
    );
  }
}

export default ArtistPage;
