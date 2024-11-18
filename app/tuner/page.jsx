"use client";
import React from "react";
import { useEffect, useState } from "react";
import Pitchfinder from "pitchfinder";
import cx from "classnames";
import NextImage from 'next/image';

export default function Home() {
  const [note, setNote] = useState(null); // Tespit edilen nota
  const [frequency, setFrequency] = useState(null); // Tespit edilen frekans
  const [centsOff, setCentsOff] = useState(0); // Notanın ne kadar doğru çalındığını gösteren fark
  const [order, setOrder] = useState(0);
  const [selected, setSelected] = useState(0);
  const closeValue = 10;
  const notes = [
    { note: "C2", frequency: 65.41 },
    { note: "C#2", frequency: 69.3 },
    { note: "D2", frequency: 73.42 },
    { note: "D#2", frequency: 77.78 },
    { note: "E2", frequency: 82.41 },
    { note: "F2", frequency: 87.31 },
    { note: "F#2", frequency: 92.5 },
    { note: "G2", frequency: 98.0 },
    { note: "G#2", frequency: 103.83 },
    { note: "A2", frequency: 110.0 },
    { note: "A#2", frequency: 116.54 },
    { note: "B2", frequency: 123.47 },
    { note: "C3", frequency: 130.81 },
    { note: "C#3", frequency: 138.59 },
    { note: "D3", frequency: 146.83 },
    { note: "D#3", frequency: 155.56 },
    { note: "E3", frequency: 164.81 },
    { note: "F3", frequency: 174.61 },
    { note: "F#3", frequency: 185.0 },
    { note: "G3", frequency: 196.0 },
    { note: "G#3", frequency: 207.65 },
    { note: "A3", frequency: 220.0 },
    { note: "A#3", frequency: 233.08 },
    { note: "B3", frequency: 246.94 },
    { note: "C4", frequency: 261.63 },
    { note: "C#4", frequency: 277.18 },
    { note: "D4", frequency: 293.66 },
    { note: "D#4", frequency: 311.13 },
    { note: "E4", frequency: 329.63 },
    { note: "F4", frequency: 349.23 },
    { note: "F#4", frequency: 369.99 },
    { note: "G4", frequency: 392.0 },
    { note: "G#4", frequency: 415.3 },
    { note: "A4", frequency: 440.0 },
    { note: "A#4", frequency: 466.16 },
    { note: "B4", frequency: 493.88 },
    { note: "C5", frequency: 523.25 },
    { note: "C#5", frequency: 554.37 },
    { note: "D5", frequency: 587.33 },
    { note: "D#5", frequency: 622.25 },
    { note: "E5", frequency: 659.25 },
    { note: "F5", frequency: 698.46 },
    { note: "F#5", frequency: 739.99 },
    { note: "G5", frequency: 783.99 },
    { note: "G#5", frequency: 830.61 },
    { note: "A5", frequency: 880.0 },
    { note: "A#5", frequency: 932.33 },
    { note: "B5", frequency: 987.77 },
    { note: "C6", frequency: 1046.5 },
  ];

  useEffect(() => {
    // Kullanıcıdan mikrofon izni isteme ve sesi yakalama
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

        const lowPassFilter = audioContext.createBiquadFilter();
        lowPassFilter.type = 'lowpass';
        lowPassFilter.frequency.value = 1000; // 1000 Hz altı frekanslar geçecek
        microphone.connect(lowPassFilter);
        lowPassFilter.connect(analyser);

          const highPassFilter = audioContext.createBiquadFilter();
  highPassFilter.type = 'highpass';
  highPassFilter.frequency.value = 55; // 50 Hz'in altındaki gürültüleri filtreleyin
  microphone.connect(highPassFilter);
  highPassFilter.connect(analyser);


        analyser.fftSize = 4096;
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        const detectPitch = Pitchfinder.YIN({
          sampleRate: audioContext.sampleRate,
          threshold: 0.15,   // Eşik değeri
          tolerance: 0.15   
        }); // Sample rate kullanarak YIN alg. oluştur

        scriptProcessor.onaudioprocess = function (event) {
          const audioData = event.inputBuffer.getChannelData(0); // Tek kanal ses verisi
          const detectedPitch = detectPitch(audioData); // Frekansı tespit et

          // Frekans tespiti yapıldıysa ve 1000 Hz'in altındaysa işlemleri yap
          if (detectedPitch && detectedPitch <= 1000) {
            setFrequency(detectedPitch.toFixed(2)); // Frekansı ayarla
            const closestNote = getNoteFromFrequency(detectedPitch); // Nota tespiti ve ayarlama
            setNote(closestNote.note);
            setCentsOff(closestNote.cents); // Cents farkını ayarla
            setOrder(closestNote.order);
            setSelected(closestNote.order * 10 + Math.round(centsOff / 10));
          }
        };
      })
      .catch((err) => console.error("Mikrofon erişim hatası:", err));
  }, []);

  // Frekansa göre nota ismini ve cent farkını bulma fonksiyonu
  function getNoteFromFrequency(frequency) {
    // En yakın notayı ve cent farkını bul
    let closestNote = notes[0];
    let minDiff = Math.abs(frequency - notes[0].frequency);
    let centDiff = 0;

    for (let i = 1; i < notes.length; i++) {
      const diff = Math.abs(frequency - notes[i].frequency);
      if (diff < minDiff) {
        closestNote = notes[i];
        minDiff = diff;
      }
    }

    // Cent farkını hesapla
    centDiff = 1200 * Math.log2(frequency / closestNote.frequency);

    return { note: closestNote.note, cents: centDiff.toFixed(2), order: notes.indexOf(closestNote) };
  }

  return (
    <div className="w-full min-h-screen bg-[#1F1F1F] flex items-center py-20 flex-col">
      <div className="flex flex-col gap-4 items-center">
      <h1 className="flex gap-4 items-center justify-center text-[52px] font-bold tracking-tighter"><NextImage src="/tunerLogo.png" width={72} height={72} quality={100} priority />Tuner</h1>
      <p className="text-2xl text-white">Online Chromotic Tuner.</p>
      </div>

      {/* Tuner Div */}
      <div className="w-[800px] flex items-center select-none justify-center relative bg-[#242424] border border-[#353535] overflow-hidden mt-20 py-40 rounded-3xl ">
        <div className="w-24 h-full absolute left-0 bottom-0 bg-gradient-to-r !z-50 from-[#242424]/10 to-transparent"></div>

        {/* Left-Right Dark Shadows */}
        <div className="select-none pointer-events-none w-40 h-full absolute right-0 bottom-0 bg-gradient-to-l from-[#242424] to-transparent z-50 "></div>
        <div className="select-none pointer-events-none w-40 h-full absolute left-0 bottom-0 bg-gradient-to-r from-[#242424] to-transparent z-50 "></div>

        {/* Middle Triangle */}
        <div className="absolute bottom-12 text-lg">
          <div className={cx({
            'hidden': Math.round(centsOff/10) <= 0,
          })}>+{Math.round(centsOff/10)} Decrase Tone</div>
                    <div className={cx({
            'hidden': Math.round(centsOff/10) >= 0,
          })}>{Math.round(centsOff/10)} Increase Tone</div>
                              <div className={cx({
            'hidden text-green-300': Math.round(centsOff/10) != 0,
          })}>Correct</div>
        </div>
        <div
          className="select-none pointer-events-none absolute bottom-1/3 left-1/2 w-0 h-0 -translate-x-1/2 
          border-l-[6px] border-l-transparent
          border-b-[9px] border-b-white
          border-r-[6px] border-r-transparent"></div>
        <div
          className="select-none pointer-events-none absolute top-1/2 left-0 translate-y-2/3 ml-[500px] transition-all duration-1000"
          style={{
            left: `calc(-100px * ${order + 1})`,
            transform: `translateX(${-10 * Math.round(centsOff / 10)}px)`,
          }}>
          <div className="select-none pointer-events-none flex items-end gap-2">
            {[...Array(481)].map((n, i) => {
              return (
                <div
                  key={i}
                  className={cx("w-[2px] h-2", {
                    "bg-[#878787]": i % 10 != 0,
                    "!h-4 relative bg-[#C1C1C1]": i % 10 == 0,
                    "!bg-[#3FFF97]": i % 10 == 0 && i == selected && Math.abs(centsOff) < closeValue,
                  })}>
                  <div
                    className={cx(
                      "absolute select-none pointer-events-none overflow-hidden text-white font-medium bottom-8 transition-all duration-1000 text-center -left-0 -translate-x-1/2",
                      {
                        "!hidden": i % 10 != 0,
                        "!text-[#3FFF97]": i % 10 == 0 && i == selected && Math.abs(centsOff) < closeValue,
                      }
                    )}>
                    {(i + 1) % 10 == 1 ? notes[i / 10]?.note : ""}
                  </div>
                </div>
                
              );
            })}
          </div>
          
        </div>
        
      </div>
      <div className="text-[#8A8A8A] mt-20 text-center gap-2">

      <span>2024 © Made by <a className="text-white/80 transition hover:text-white" href="https://x.com/astrodokki">Emir</a>. <br /> <span>All rights reserved.</span> </span>

      </div>
    </div>
  );
}
