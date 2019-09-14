import React, { useState, useEffect} from 'react'
import { ThemeProvider } from 'styled-components'
import Video from '../layout/Video'
import Playlist from './Playlist'
import StyledPlayer from '../styles/StyledPlayer';


const theme = {
  bgcolor: '#353535',
  bgcolorItem: '#414141',
  bgcolorItemActive: '#405c63',
  bgcolorPlayed: '#526d4e',
  border: 'none',
  borderPlayerd: 'none',
  color: '#fefefe'
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

const Player = ({ match, history, location}) => {
  
  const videos = JSON.parse(document.querySelector('[name="videos"]').value);

  const [state, setState] = useState({
    videos: videos.playlist,
    activeVideo: videos.playlist[0],
    nightMode: true,
    playlistId: videos.playlistId,
    autoplay: false
  })



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

  // const progressCallback = e => {
  //   if (e.playedSeconds > 10 && e.playedSeconds < 11) {
  //     const videos = [...state.videos];
  //     const playedVideo = videos.find(
  //       video => video.id === state.activeVideo.id,
  //     );
  //     playedVideo.played = true;

  //     setState(prevState => ({ ...prevState, videos }));
  //   }
  // }


  const progressCallback = e => {
    if (e.playedSeconds > 5 && e.playedSeconds < 6) {
      setState({
        ...state,
        videos: state.videos.map( el => {
          return el.id === state.activeVideo.id
            ? {...el, played: true}
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
