import axios from 'axios'
import Layout from 'components/AdmindPanel/Layout'
import News from 'components/AdmindPanel/News'
import LoaderNews from 'components/AdmindPanel/News/LoaderNews'
import MinimalLoader from 'components/Loader'
import useAuthDash from 'hooks/useAuthFetch'
import { useEffect, useState } from 'react'

export default function Dash() {
  const [feedPublish, setFeedPublish] = useState()
  const [querySuccess, setQuerySuccess] = useState(false)

  const { token } = useAuthDash()
  const limitNews = 4
  useEffect(() => {
    if (token) {
      axios({
        method: 'GET',
        url: '/news?limit=4',
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        .then((res) => {
          setFeedPublish(res.data)

          setQuerySuccess(true)
        })
        .catch(() => {
          setQuerySuccess(false)
        })
    }
  }, [token])
  return (
    <>
      <Layout>
        <MinimalLoader succes={querySuccess} />
        <div>
          <h1 className="text-3xl text-slate-100 font-semibold">
            Bienvenido, Oscar Andres
          </h1>
        </div>
        <div className="border-b border-white mb-3 mt-10 flex items-center">
          <h4 className="font-base text-slate-300 hover:text-white text-xl">
            Publicaciones Recientes
          </h4>
        </div>
        {!querySuccess && <LoaderNews limits={limitNews} />}
        {feedPublish && <News data={feedPublish} />}
      </Layout>
    </>
  )
}
export async function getServerSideProps(context) {
  const token = context.req.cookies.updateToken
  if (!token) {
    return {
      redirect: {
        destination: '/dash/login',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}
