'use client'

import { getProviders, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  const isUserLoggedIn = true
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setNavProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }

    setNavProviders().then()
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center' >
        <Image
          src='/assets/images/logo.svg'
          width={30}
          alt='Promptopia Logo'
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>

      {/*Desktop Navigation*/}
      <div className='sm:flex hidden'>
        {isUserLoggedIn
          ? <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
            <Link href='/profile' >
              <Image
                src='/assets/images/logo.svg'
                className='rounded-full'
                width={37}
                height={37}
                alt='profile'
              />
            </Link>
          </div>
          : <>
            {providers &&
            Object.values(providers).map(provider => {
              return (
                <button
                  key={provider.id}
                  type='button'
                  className='black_btn'
                  onClick={() =>
                    signIn(provider.id)}
                >
                  Sign In
                </button>
              )
            })
            }
          </>}
      </div>

      {/*Mobile Navigation*/}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src='/assets/images/logo.svg'
              width={30}
              alt='Promptopia Logo'
              height={30}
              className='object-contain'
              onClick={() => setToggleDropdown(prevState => !prevState)}
            />
            {toggleDropdown  && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}>Create Prompt
                </Link>
                <button
                  type='button'
                  className='mt-5 w-full black_btn'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}>Sign Out
                </button>
              </div>
            )}
          </div>
        ): <>
          {providers &&
            Object.values(providers).map(provider => {
              return (
                <button
                  key={provider.id}
                  type='button'
                  className='black_btn'
                  onClick={() =>
                    signIn(provider.id)}
                >
                  Sign In
                </button>
              )
            })
          }
        </>}
      </div>
    </nav>
  )
}

export default Nav
