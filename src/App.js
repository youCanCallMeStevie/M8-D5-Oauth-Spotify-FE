import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import BottomPlayer from "./Components/BottomPlayer";
import Home from "./Components/Home";
import ArtistPage from "./Components/ArtistPage";
import Login from "./Components/Login";
import SideNavBar from "./Components/SideNavBar";
import SongList from "./Components/SongList";
import AlbumPage from "./Components/AlbumPage";
import ModalPlaylist from "./Components/Modal/ModalPlaylist";
import { getSearch } from "./api/index";

class App extends React.Component {
  state = {
    searchedAlbums: [],
    searchedLoading: null,
    searchString: "",
    showModal: false,
  };

  showSearchResult = async (searchString) => {
    this.setState({ searchedLoading: true });
    const musicAlbums = await getSearch(searchString);
    this.setState({ searchedAlbums: musicAlbums.data });
    this.setState({ searchedLoading: false });
  };

  showModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    return (
      <Router className="App">
        <ModalPlaylist show={this.state.showModal} toggle={this.showModal} />
        <SideNavBar
          searchedAlbums={this.state.searchedAlbums}
          searchedLoading={this.state.searchedLoading}
          showSearchResult={this.showSearchResult}
          toggle={this.showModal}
        />
        <BottomPlayer />
        <Switch>
          <Route path="/" exact render={(props) => <Login {...props} />} />
          <Route
            path="/home"
            exact
            render={(props) => (
              <Home
                {...props}
                searchedAlbums={this.state.searchedAlbums}
                searchedLoading={this.state.searchedLoading}
              />
            )}
          />
          <Route
            path="/album/:id"
            render={(props) => (
              <AlbumPage
                {...props}
                searchedAlbums={this.state.searchedAlbums}
                searchedLoading={this.state.searchedLoading}
              />
            )}
          />
          {/* <Route
          path={["/artist/:id/:name", "/home", "/album/:id"]}
          render={props => (
            <SideNavBar
              {...props}
              searchedAlbums={this.state.searchedAlbums}
              searchedLoading={this.state.searchedLoading}
              showSearchResult={this.showSearchResult}
            />
          )}
        /> */}

          <Route
            path="/artist/:id/:name"
            render={(props) => (
              <ArtistPage
                {...props}
                searchedAlbums={this.state.searchedAlbums}
                searchedLoading={this.state.searchedLoading}
              />
            )}
          />
          <Route path="/login" exact render={(props) => <Login {...props} />} />
          <Route
            path="/liked-song/:userId"
            render={(props) => <SongList {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
