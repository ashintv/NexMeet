'use client';

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
import axios from 'axios';

export default function Page() {
        // TODO: get user input for room and name
        const [token ,  setToken] = useState('')
        const [roomInstance] = useState(() => new Room({
                // Optimize video quality for each participant's screen
                adaptiveStream: true,
                // Enable automatic audio/video quality optimization
                dynacast: true,
        }));

        useEffect(() => {
                let mounted = true;
                (async () => {
                        try {
                                if (!mounted) return;
                                const response = await axios.post("http://localhost:3001/token/host", {
                                        "identity": "second-user-nextjs",
                                        "roomname": "room-nextjs"
                                })
                                //admin token
                                setToken(response.data.token)
                                await roomInstance.connect("wss://meet-fstakduf.livekit.cloud", response.data.token);
                                console.log(response.data.token)

                        } catch (e) {
                                console.error(e);
                        }
                })();

                return () => {
                        mounted = false;
                        roomInstance.disconnect();
                };
        }, [roomInstance]);

        if (token=="") {
                return <div>Getting token...</div>;
        }

        return (
                <RoomContext.Provider value={roomInstance}>
                        <div data-lk-theme="default" style={{ height: '100dvh' }}>
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