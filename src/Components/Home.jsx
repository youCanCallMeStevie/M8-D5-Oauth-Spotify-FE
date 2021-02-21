import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";
import "./CSS/Home.css";
import Gallery from "./Gallery";
import UserBanner from "./UserBanner";

//UTILITIES IMPORTS
import { getSearch } from "../api";

//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";

//ACTIONS IMPORTS

const maptoStateToProps = (state) => state;

class Home extends Component {
  state = {
    beyonceAlbums: [],
    maxCooperAlbums: [],
    cakeAlbums: [],
    // selectedMovieID: null,
    comments: [],
    isModalOpen: false,
    selectedAlbumId: null,
    loading: true,
    error: false,
    urls: [
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=beyonce",
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=max%20cooper",
      "https://deezerdevs-deezer.p.rapidapi.com/search?q=cake",
    ],
  };

  handleSelectedAlbum = (id) => {
    console.log("selected album id changed", id);
    this.setState({ selectedAlbumId: id });
  };

  fetchAlbums = async () => {
    let beyonce = await getSearch("beyonce");
    let maxCooper = await getSearch("max%20cooper");
    let cake = await getSearch("cake");

    let beyonceAlbums = await beyonce.data;
    let maxCooperAlbums = await maxCooper.data;
    let cakeAlbums = await cake.data;

    setTimeout(() => {
      this.setState({
        beyonceAlbums,
        maxCooperAlbums,
        cakeAlbums,
        loading: false,
      });
    }, 500);
  };

  componentDidMount() {
    this.fetchAlbums();
  }

  render() {
    return (
      <>
        <UserBanner />

        <section className="home-body">
          <div className="main-content d-flex flex-column">
            <div className="justify-content-center">
              <div>
                <ul
                  className="nav nav-tabs justify-content-center"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
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
                      TRENDING
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
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
                      PODCAST
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
                      MOODS AND GENRES
                    </a>
                  </li>
                  <li
                    className="nav-item d-none d-md-flex "
                    role="presentation"
                  >
                    <a
                      className="nav-link"
                      id="new-releases-tab"
                      data-toggle="tab"
                      href="#new-releases"
                      role="tab"
                      aria-controls="new-releases"
                      aria-selected="false"
                      data-target="#homepage-headings"
                      data-slide-to="2"
                    >
                      NEW RELEASES
                    </a>
                  </li>
                  <li className="nav-item d-none d-md-flex" role="presentation">
                    <a
                      className="nav-link"
                      id="discover-tab"
                      data-toggle="tab"
                      href="#discover"
                      role="tab"
                      aria-controls="discover"
                      aria-selected="false"
                      data-target="#homepage-headings"
                      data-slide-to="2"
                    >
                      DISCOVER
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {this.state.error && (
              <Alert variant="danger" className="text-center">
                An error has occurred, please try again later
              </Alert>
            )}
            {!this.state.error &&
              (this.props.searchedAlbums.length > 0 ||
                this.props.searchedLoading === true) && (
                <Gallery
                  title="Search Results"
                  loading={this.props.searchedLoading}
                  Albums={this.props.searchedAlbums}
                  comments={this.state.comments}
                  // fetchComments={this.fetchComments}
                  // handleOpenModal={this.handleOpenModal}
                  // selectedAlbumId={this.handleSelectedAlbum}
                />
              )}
            {!this.state.error &&
              (!this.props.searchedAlbums.length > 0 ||
                this.props.searchedLoading === null) && (
                <>
                  <Gallery
                    title="Beyonce"
                    loading={this.state.loading}
                    Albums={this.state.beyonceAlbums.slice(0, 6)}
                    comments={this.state.comments}
                    // fetchComments={this.fetchComments}
                    // handleOpenModal={this.handleOpenModal}
                    // selectedAlbumId={this.handleSelectedAlbum}
                  />
                  <Gallery
                    title="Max Cooper"
                    loading={this.state.loading}
                    Albums={this.state.maxCooperAlbums.slice(0, 6)}
                    comments={this.state.comments}
                    // fetchComments={this.fetchComments}
                    // handleOpenModal={this.handleOpenModal}
                    // selectedAlbumId={this.handleSelectedAlbum}
                  />
                  <Gallery
                    title="Cake"
                    loading={this.state.loading}
                    Albums={this.state.cakeAlbums.slice(0, 6)}
                    comments={this.state.comments}
                    // fetchComments={this.fetchComments}
                    // handleOpenModal={this.handleOpenModal}
                    // selectedAlbumId={this.handleSelectedAlbum}
                  />
                </>
              )}
          </div>
        </section>
      </>
    );
  }
}

export default connect(maptoStateToProps)(Home);
