import React from 'react'

interface BubbleCardProps {
  children: React.ReactNode;
}

const BubbleCard = ({ children }: BubbleCardProps) => {
  return (
    <div className="w-full border border-[rgba(98,67,223,0.07)] rounded-lg bg-blue-500/10 p-4">
      {children}
    </div>
  )
}

export default BubbleCard