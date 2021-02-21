import React, { PureComponent } from "react";
import { connect } from "react-redux";
import UserBanner from "./UserBanner";

//ICONS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarTimes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

//STYLE
import "./CSS/SongList.scss";

//ACTIONS IMPORTS
import { removedSong } from "../store/user/action";

//MAP TO STATE TO PROPS
const maptoStateToProps = state => state.user;

const mapDispatchtoProps = dispatch => ({
  removeSong: song =>
    dispatch((dispatch, getState) => {
      dispatch(removedSong(song));
    }),
});

class SongList extends PureComponent {
  render() {
    console.log(this.props.liked);
    let list = this.props.liked;
    return (
      <>
        <UserBanner />
        
        <div className="liked-song mt-5">
          <div className="liked-song-list">
            <header>
              <div className="filter">
                <FontAwesomeIcon icon={faSearch} />
                <input type="text" placeholder="Filter" />
              </div>
              <div className="download">
                <span>Download</span>
                <div className="toggle-button">
                  <div className="toggle"></div>
                </div>
              </div>
            </header>
            <table className="list">
              <tr>
                <th> </th>
                <th>Title</th>
                <th>Artist</th>
                <th>Album</th>
                <th>
                  <FontAwesomeIcon icon={faCalendarTimes} />
                </th>
              </tr>
              {list.map(track => {
                return (
                  <tr>
                    <td>
                      <FontAwesomeIcon
                        icon={faHeart}
                        onClick={() => this.props.removeSong(track)}
                      />
                    </td>
                    <td>{track.title}</td>
                    <td>{track.artist.name}</td>
                    <td>{track.album.title}</td>
                    <td>{track.added.toString().substring(4, 15)}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </>
    );
  }
}
export default connect(maptoStateToProps, mapDispatchtoProps)(SongList);
