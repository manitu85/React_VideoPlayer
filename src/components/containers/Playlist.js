import React from 'react'
import PlaylistHeader from '../layout/PlaylistHeader'
import PlaylistItems from '../containers/PlaylistItems'
import NightMode from '../themes/Nightmode';
import StyledPlaylist from '../styles/StyledPlaylist';

const Playlist = ({ videos, active, nightModeCallback, nightMode }) => (
  <StyledPlaylist>
    <NightMode nightModeCallback={nightModeCallback} nightMode={nightMode} />
    <PlaylistHeader active={active} total={videos.length} />
    <PlaylistItems videos={videos} active={active} />
  </StyledPlaylist>
)

export default Playlist

