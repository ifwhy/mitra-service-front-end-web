// components/Typewriter.tsx
'use client'

import React, { useEffect, useState } from 'react'

const texts = ['4.8 Kepuasan Pelanggan', '5k+ Perbaikan Perangkat', 'Teknisi Kompeten', '10+ Jenis Perbaikan', 'Garansi Perbaikan']

const Typewriter: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [index, setIndex] = useState<number>(0)
  const [subIndex, setSubIndex] = useState<number>(0)
  const [deleting, setDeleting] = useState<boolean>(false)

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !deleting) {
      // Tunggu sebentar sebelum mulai menghapus
      setTimeout(() => setDeleting(true), 1000)
      return
    }

    if (subIndex === 0 && deleting) {
      // Pindah ke teks berikutnya
      setDeleting(false)
      setIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, deleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [subIndex, deleting, index])

  return (
    <div className="text-2xl font-semibold">
      {texts[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </div>
  )
}

export default Typewriter
