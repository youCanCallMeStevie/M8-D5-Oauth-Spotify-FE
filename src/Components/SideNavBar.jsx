import Logo from "../assets/logo.png";
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { InputGroup, FormControl, Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import {
  faSearch,
  faHome,
  faBook,
  faHeart,
  faPlusCircle,
  faArrowCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  isLoggedIn,
  addToPlaylist,
  createPlaylist,
} from "../store/user/action";
import "./CSS/SideNavBar.css";

//UTILITIES
import { getSearch } from "../api";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  isLoggedIn: () => dispatch(isLoggedIn()),
  handleLogout: () => dispatch(isLoggedIn()),
  createPlaylist: (name) => dispatch(createPlaylist(name)),
});

export class SideNavBar extends Component {
  state = { searchString: "", playlistName: "", inputPlaylist: false };

  searchStringHandler = async (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      this.props.showSearchResult(this.state.searchString);
      // let result = await getSearch(this.state.searchString);
      // console.log(result);
    } else {
      this.setState({ searchString: e.currentTarget.value });
    }
  };

  addPlaylist = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      this.props.createPlaylist(this.state.playlistName);
      this.setState({ inputPlaylist: false, playlistName: "" });
    } else {
      this.setState({ playlistName: e.currentTarget.value });
    }
  };

  showInput = () => {
    this.setState({ inputPlaylist: !this.state.inputPlaylist });
  };

  render() {
    // console.log(this.props);
    let path = this.props.location.pathname;
    return (
      <>
        <div
          className="aside"
          style={{ display: path === "/login" || path === "/" ? "none" : "" }}
        >
          <div>
            <Link to="/home">
              <Image src={Logo} alt="logo" className="logo" />
            </Link>
          </div>

          <div className="menu d-flex column justify-content-start align-items-center">
            <div className="input-group-prepend">
              <InputGroup className="mb-3">
                <FormControl
                  value={this.props.query}
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                  onKeyDown={this.searchStringHandler}
                  onChange={this.searchStringHandler}
                  value={this.state.searchString}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    id="searchBtn"
                    className="btn btn-outline-success btn-sm"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </div>
          <div className="menu d-flex column justify-content-start align-items-center">
            <div className="col">
              <Link to="/home">
                <FontAwesomeIcon
                  className="fas fa-home fa-lg mr-3"
                  icon={faHome}
                />
                Home
              </Link>
            </div>
          </div>
          <div className="menu d-flex column justify-content-start align-items-center">
            <div className="col">
              <a href="#">
                {" "}
                <FontAwesomeIcon
                  className="fas fa-book fa-lg mr-3"
                  icon={faBook}
                />
                Your library
              </a>
            </div>
          </div>
          <div
            className="menu d-flex column justify-content-start align-items-center"
            onClick={() => this.showInput()}
          >
            <div className="col">
              <FontAwesomeIcon
                className="fas fa-plus-circle fa-lg mr-3"
                icon={faPlusCircle}
              />
              Create playlist
              <br />
            </div>
          </div>
          <input
            id="add-playlist"
            style={{ display: this.state.inputPlaylist ? "" : "none" }}
            type="text"
            placeholder="Name Playlist"
            onKeyDown={this.addPlaylist}
            onChange={this.addPlaylist}
            value={this.state.playlistName}
          />
          <input
            type="button"
            value="Show Playlist"
            id="show-playlist"
            style={{
              display: this.props.user.playlists.length > 0 ? "" : "none",
            }}
            onClick={this.props.toggle}
          />
          <div className="menu d-flex column justify-content-start align-items-center">
            <div className="col">
              <Link to={`/liked-song/${this.props.user.details.username}`}>
                <FontAwesomeIcon
                  className="fas fa-heart fa-lg mr-3"
                  icon={faHeart}
                />
                Liked Songs
              </Link>
            </div>
          </div>

          <br />
          <div className="playlists"></div>

          <div className="stick-to-bottom-index-page">
            {!this.props.user.login ? (
              <>
                <div className="login-button-index">
                  <a href="">
                    <span>SIGN UP</span>
                  </a>
                </div>
                <Link to="/login">
                  <Button className="login-button-index">
                    <span>LOGIN</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/home">
                <Button
                  className="login-button-index"
                  onClick={() => this.props.handleLogout()}
                >
                  <span>LOGOUT</span>
                </Button>
              </Link>
            )}
            <div className="install-btn">
              <a href="#">
                <FontAwesomeIcon icon={faArrowCircleDown} />
                Install
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideNavBar)
);
