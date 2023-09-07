import { useState } from 'react'
import Image from 'next/image'

const PromptCard = props => {
  const [copied, setCopied] = useState('')
  const handleCopy = () => {
    setCopied(props.post.prompt)
    navigator.clipboard.writeText(props.post.prompt)
    setTimeout(() => setCopied(''), 3000)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={props.post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {props.post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {props.post.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={`/assets/icons/${copied === props.post.prompt ? 'tick' : 'copy'}.svg`}
            width={12}
            height={12}
            alt='Copy image'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{props.post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => props.handleTagClick && props.handleTagClick(props.post.tag) }
      >
        {props.post.tag}
      </p>
    </div>
  )
}

export default PromptCard
