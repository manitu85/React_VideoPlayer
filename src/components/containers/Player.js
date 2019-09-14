import React, { useState, useEffect} from 'react'
import { ThemeProvider } from 'styled-components'
import Video from '../layout/Video'
import Playlist from './Playlist'
import StyledPlayer from '../styles/StyledPlayer';


const theme = {
  bgcolor: '#22163b',
  bgcolorItem: '#451f55',
  bgcolorItemActive: '#724e91',
  bgcolorPlayed: '#e54f6d',
  border: 'none',
  borderPlayerd: 'none',
  color: '#f8c630'
}

const themeLight = {
  bgcolor: '#fff',
  bgcolorItem: '#fff',
  bgcolorItemActive: '#89a7b1',
  bgcolorPlayed: '#7d9979',
  border: '1px solid #353535',
  borderPlayed: 'none',
  color: '#353535'
}

const Player = ({ match, history, location }) => {
  
  const videos = JSON.parse(document.querySelector('[name="videos"]').value);
  const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`))
  
  const [state, setState] = useState({
    videos: savedState ? savedState.videos : videos.playlist,
    activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
    nightMode: savedState ? savedState.nightMode : true,
    playlistId: savedState ? savedState.playlistId : videos.playlistId,
    autoplay: savedState ? savedState.autoplay : false
  })

  // Sync Local storage with state
  useEffect(() => {
    localStorage.setItem(`${state.playlistId}`,JSON.stringify({ ...state }))
  }, [state])


  useEffect(() => {
    const videoId = match.params.activeVideo;
    if (videoId !== undefined ) {
      const newActiveVideo = state.videos.findIndex(video => video.id === videoId)

      setState( prevState => ({
        ...prevState,
        activeVideo: prevState.videos[newActiveVideo],
        autoplay: location.autoplay,
      }));

    } else  {
      history.push({
        pathname: `/${state.activeVideo.id}`,
        autoplay: false
      })
    }
    
  }, [history, 
      location.autoplay, 
      match.params.activeVideo, 
      state.activeVideo.id, 
      state.videos ]
  )

  

  const nightModeCallback = () => {
      setState( prevState => ({
        ...prevState,
        nightMode: !prevState.nightMode 
      }))
  }


  const endCallback = () => {
    const videoId = match.params.activeVideo;
    // Find index of video array
    const currVideoIdx = state.videos.findIndex(video => video.id === videoId);
    // Find next video
    const nextVideo = currVideoIdx === state.videos.length -1 ? 0 : currVideoIdx + 1;

    history.push({
      pathname: `${state.videos[nextVideo].id}`,
      autoplay: false,
    });

  }

  const progressCallback = e => {
    if (e.playedSeconds > 5 && e.playedSeconds < 6) {
      setState({
        ...state,
        videos: state.videos.map(el => {
          return el.id === state.activeVideo.id
            ? { ...el, played: true }
            : el
        })
      })
    }
  }

return (
  <ThemeProvider theme={state.nightMode ? theme : themeLight} >
    {state.videos !== null 
      ? ( <StyledPlayer>
            <Video 
              active={state.activeVideo}
              autoplay={state.autoplay}
              endCallback={endCallback}
              progressCallback={progressCallback}
            />
            <Playlist 
              videos={state.videos}
              active={state.activeVideo}
              nightModeCallback={nightModeCallback}
              nightMode={state.nightMode}
            />
          </StyledPlayer> )
      : null
    }
  </ThemeProvider>
  ) 
}


export default Player
