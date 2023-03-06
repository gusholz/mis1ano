import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AR } from 'aruco-marker';

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const constraints = { audio: false, video: { facingMode: "environment" } };

    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        setError(error);
      }
    }

    enableCamera();
  }, []);

  useEffect(() => {
    if (scanning) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      if (canvas && video) {
        const context = canvas.getContext('2d');
        const ar = new AR();

        async function recognizeImage() {
          setLoading(true);
          const { width, height } = video.getBoundingClientRect();
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          const imageData = context.getImageData(0, 0, width, height);
          const markers = ar.detect(imageData);

          if (markers.length > 0) {
            console.log(`ArUco marker found: ${markers[0].id}`);
          }

          setLoading(false);
        }

        recognizeImage();
        setInterval(recognizeImage, 5000);

        return () => {
          clearInterval();
        };
      }
    }
  }, [scanning]);

  if (error) {
    return (
      <div>
        <p>Erro ao acessar a câmera: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
        <video ref={videoRef} autoPlay={true} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor:"#000"}}
        />
      <motion.canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
        onClick={() => setScanning(!scanning)}
        animate={{ opacity: scanning ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {loading && <p>Carregando...</p>}
    </div>
  );
}
