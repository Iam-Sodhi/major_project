import React, { useEffect, useRef, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, updateDoc, onSnapshot, addDoc ,getDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBucHjunnud9-7QAos-4OJo9qaI_fQClqA",
  authDomain: "skincare-68855.firebaseapp.com",
  databaseURL: "https://skincare-68855-default-rtdb.firebaseio.com",
  projectId: "skincare-68855",
  storageBucket: "skincare-68855.appspot.com",
  messagingSenderId: "12165741975",
  appId: "1:12165741975:web:febb11c4d55e8dd27818d2",
  measurementId: "G-8DSXKHG83Z"
};

const VideoCall = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callId, setCallId] = useState('');
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const pcRef = useRef(null);
  const firestoreRef = useRef(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    firestoreRef.current = getFirestore(app);

    const servers = {
      iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
      ],
      iceCandidatePoolSize: 10,
    };

    pcRef.current = new RTCPeerConnection(servers);

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  const setupMediaSources = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const remote = new MediaStream();

      setLocalStream(stream);
      setRemoteStream(remote);
      setIsWebcamEnabled(true);

      stream.getTracks().forEach((track) => pcRef.current.addTrack(track, stream));

      pcRef.current.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => remote.addTrack(track));
      };

      webcamVideoRef.current.srcObject = stream;
      remoteVideoRef.current.srcObject = remote;
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const createCall = async () => {
  const callDoc = doc(collection(firestoreRef.current, 'calls'));
  const offerCandidates = collection(callDoc, 'offerCandidates');
  const answerCandidates = collection(callDoc, 'answerCandidates');

  setCallId(callDoc.id);

  // Ensure pcRef.current is initialized
  if (!pcRef.current) {
    console.error("Peer connection is not initialized.");
    return;
  }

  // Set ICE candidate handler to send candidates to Firestore
  pcRef.current.onicecandidate = (event) => {
    if (event.candidate) {
      console.log("Adding ICE candidate:", event.candidate);
      addDoc(offerCandidates, event.candidate.toJSON());
    }
  };

  // Create offer and set local description
  const offerDescription = await pcRef.current.createOffer();
  await pcRef.current.setLocalDescription(offerDescription);

  // Save the offer to Firestore
  await setDoc(callDoc, {
    offer: {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }
  });

  // Watch for changes in the call document and set the remote description once an answer is received
  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data();
    if (data?.answer && !pcRef.current.currentRemoteDescription) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pcRef.current.setRemoteDescription(answerDescription);
    }
  });

  // Watch for answer candidates and add them to the peer connection
  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        console.log("Adding ICE candidate from answer:", candidate);
        pcRef.current.addIceCandidate(candidate);
      }
    });
  });
};


const answerCall = async () => {
  try {
    if (!callId) {
      console.error("No callId provided");
      return;
    }

    // First verify firestoreRef.current exists
    if (!firestoreRef.current) {
      console.error("Firestore reference is not initialized");
      return;
    }

    const callDoc = doc(firestoreRef.current, 'calls', callId);
    
    // Get the document with error handling
    const docSnapshot = await getDoc(callDoc);
    console.log(docSnapshot);
    if (!docSnapshot.exists()) {
      console.error(`No document exists for call ID: ${callId}`);
      return;
    }

    const callData = docSnapshot.data();
    
    if (!callData) {
      console.error("Document exists but data is null");
      return;
    }

    if (!callData.offer) {
      console.error("No offer found in call data");
      return;
    }

    // Rest of your code...
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pcRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidates, event.candidate.toJSON());
      }
    };

    await pcRef.current.setRemoteDescription(new RTCSessionDescription(callData.offer));
    const answerDescription = await pcRef.current.createAnswer();
    await pcRef.current.setLocalDescription(answerDescription);

    await updateDoc(callDoc, {
      answer: {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      }
    });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pcRef.current.addIceCandidate(candidate);
        }
      });
    });

  } catch (error) {
    console.error("Error in answerCall:", error);
    // You might want to handle or propagate the error appropriately
  }
};

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              You
            </div>
          </div>
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
              Remote
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={setupMediaSources}
            disabled={isWebcamEnabled}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            Start Webcam
          </button>
          
          <button
            onClick={createCall}
            disabled={!isWebcamEnabled}
            className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          >
            Create Call
          </button>

          <div className="flex gap-2">
            <input
              value={callId}
              onChange={(e) => setCallId(e.target.value)}
              placeholder="Enter Call ID"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={answerCall}
              disabled={!isWebcamEnabled || !callId}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
            >
              Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;