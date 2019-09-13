import React from 'react'
import PlayListItem from '../layout/PlaylistItem'
import StyledPlaylistitems from '../styles/StyledPlaylistitems'

const PlaylistItems = ({ videos, active }) => (
  <StyledPlaylistitems>
    {videos.map( video => (
      <PlayListItem 
        key={video.id}
        video={video}
        active={video.id === active.id ? true : false}
        played={video.played}
      />
    ))}
  </StyledPlaylistitems> 
)



export default PlaylistItems


