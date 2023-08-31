import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import BannersSkeleto from '../BannersSkeleto'
import { toast } from 'react-toastify'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function Banner2 ({ loadBanners, loading, banner }) {
  const [isLoading, setIsLoading] = useState(loading)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const idtoast = toast.loading('Subiendo imagen')
    const formData = new FormData()
    formData.append('image', acceptedFiles[0])
    console.log(formData)
    console.log(acceptedFiles[0])
    setIsLoading(true)
    axios.post('/api/banner2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      loadBanners().then(() => {
        setIsLoading(false)
        toast.update(idtoast, { render: 'nuevo banner agregado', autoClose: 1000, type: 'success', isLoading: false })
      })
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <>
      <div className='w-full xl:h-1/2'>
        {
          isLoading
            ? (
              <SkeletonTheme baseColor='#2a303c' highlightColor='#db1436'>
                <Skeleton count={1} className='w-full h-full' />
              </SkeletonTheme>
              )
            : (
              <section className=' cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <img src={banner} alt='' className='w-full h-full' />
                </div>
              </section>
              )
        }
      </div>
    </>
  )
}

function Banner3 ({ loadBanners, loading, banner }) {
  const [isLoading, setIsLoading] = useState(loading)
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const idtoast = toast.loading('Subiendo imagen')
    const formData = new FormData()
    formData.append('image', acceptedFiles[0])
    setIsLoading(true)
    axios.post('/api/banner3', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      loadBanners().then(() => {
        setIsLoading(false)
        toast.update(idtoast, { render: 'nuevo banner agregado', autoClose: 1000, type: 'success', isLoading: false })
      })
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })
  return (
    <>
      <div className='w-full xl:h-1/2'>
        {
          isLoading
            ? (
              <SkeletonTheme baseColor='#2a303c' highlightColor='#db1436'>
                <Skeleton count={1} className='w-full h-full' />
              </SkeletonTheme>
              )
            : (
              <section className=' cursor-pointer'>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <img src={banner} alt='' className='w-full h-full' />
                </div>
              </section>
              )
        }
      </div>
    </>
  )
}

export default function BannersEdit () {
  const [banners, setBanners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const loadBanners = async () => {
    const response = await axios.get('/api/getBanners')
    setBanners(response.data)
    console.log(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadBanners()
  }, [])

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    const idtoast = toast.loading('Subiendo imagen')
    const formData = new FormData()
    formData.append('image', acceptedFiles[0])
    console.log(formData)
    console.log(acceptedFiles[0])
    setIsLoading(true)
    axios.post('/api/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      loadBanners().then(() => {
        setIsLoading(false)
        toast.update(idtoast, { render: 'nuevo banner agregado', autoClose: 1000, type: 'success', isLoading: false })
      })
    })
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <>
      {
        isLoading
          ? <BannersSkeleto />
          : (
            <div className='w-full banner-wrapper mb-[60px]'>
              <div className='container-x mx-auto'>
                <div className='w-full'>
                  <div className='banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]'>
                    <div className='xl:w-[740px] w-full h-full cursor-pointer'>
                      <section>
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <picture>
                            <img src={banners[0].url} alt='banner 1' className='w-full max-w-full h-auto object-cover' />
                          </picture>
                        </div>
                      </section>

                    </div>
                    <div className='flex-1 flex xl:flex-col flex-row xl:space-y-[30px] h-full object-cover'>
                      <Banner2 loadBanners={loadBanners} loading={isLoading} banner={banners[1].url} />
                      <Banner3 loadBanners={loadBanners} loading={isLoading} banner={banners[2].url} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
            )
      }
    </>

  )
}
