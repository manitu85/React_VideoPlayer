import React from 'react'
import PlaylistHeader from '../layout/PlaylistHeader'
import PlaylistItems from '../containers/PlaylistItems'
import Nightmode from '../themes/Nightmode';

const ReactPlayer = props => (
    <>
      <PlaylistHeader />
      <PlaylistItems />
      <Nightmode />
    </>
)

export default ReactPlayer