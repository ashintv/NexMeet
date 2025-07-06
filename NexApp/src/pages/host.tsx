import {
        ControlBar,
        GridLayout,
        ParticipantTile,
        RoomAudioRenderer,
        useTracks,
        RoomContext,
} from '@livekit/components-react';
import { Room, Track } from 'livekit-client';
import '@livekit/components-styles';
import { useEffect, useState } from 'react';
import axios from "axios"

import { useParams } from 'react-router-dom';
import { userStore } from '@/store/useuserdata';
import { BACKEND_URL } from '@/config';


const serverUrl = 'wss://meet-fstakduf.livekit.cloud';
export  function HMeeting(){
        const { email } = userStore.getState().user
        const [room] = useState(() => new Room({
                adaptiveStream: true,
                dynacast: true,
        }));
        const {joinid } = useParams()
        // Connect to room
        useEffect(() => {
                let mounted = true;
                const connect = async () => {
                        if (mounted) {
                                
                                const response = await axios.post(BACKEND_URL+"/token/host", {
                                        "identity":email,
                                        "roomname": joinid
                                })
                                await room.connect(serverUrl, response.data.token);
                        }
                };
                connect();
                return () => {
                        mounted = false;
                        room.disconnect();
                };
        }, [room]);

        return (
                <RoomContext.Provider value={room}>
                        <div data-lk-theme="default" style={{ height: '100vh' }}>
                                {/* Your custom component with basic video conferencing functionality. */}
                                <MyVideoConference />
                                {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
                                <RoomAudioRenderer />
                                {/* Controls for the user to start/stop audio, video, and screen share tracks */}
                                <ControlBar />
                        </div>
                </RoomContext.Provider>
        );
}

function MyVideoConference() {
        // `useTracks` returns all camera and screen share tracks. If a user
        // joins without a published camera track, a placeholder track is returned.
        const tracks = useTracks(
                [
                        { source: Track.Source.Camera, withPlaceholder: true },
                        { source: Track.Source.ScreenShare, withPlaceholder: false },
                ],
                { onlySubscribed: false },
        );
        return (
                <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
                        {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
                        <ParticipantTile />
                </GridLayout>
        );
}