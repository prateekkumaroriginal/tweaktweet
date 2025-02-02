import React from 'react'

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <div className="w-fit">
      <h3 className="text-xs pr-4 uppercase font-semibold text-sky-300/80">
        {title}
      </h3>
      <div className="bg-sky-300/60 w-full h-0.5 mt-0.5" />
    </div>
  )
}

export default Title