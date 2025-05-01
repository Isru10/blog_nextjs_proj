import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { prisma } from '../utils/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import BlogpostCard from '@/components/general/BlogpostCard'
import { Skeleton } from '@/components/ui/skeleton'

async function getData(userID:string) {
  const data =  await prisma.blogPost.findMany({
    where:{
      authorId:userID,
    },
    orderBy:{
      createdAt:"desc"
    }
  });
  return data
}
const DashboardRoute = async () => {
const {getUser} = getKindeServerSession()
const user = await getUser()
const data = await getData(user!.id)
  return (
    <div className="">
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>Your blog article</h2>
        <Link className={buttonVariants()} href="/dashboard/create">Create Post</Link>
      </div>


{/* <Suspense fallback={<BlogPostsGrid/>} >  */}



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              data.map((item)=>(
                <BlogpostCard data={item} key={item.id}/>
              ))
            }
      </div>      

{/* </Suspense> */}




      
    </div>
   
  )
}

export default DashboardRoute






function BlogPostsGrid(){
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,index) => ( 
              <div className="rounded lg border bg-card text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden" key={index}>
                          {/* image skeleton */}
                      <Skeleton className='h-48 w-full rounded-none'/>
                      <div className="p-4 flex-1 flex flex-col gap-3">
                          {/* title skeleton  */}
                          <Skeleton className='h-6 w-3/4' />
                          {/* content skeleton */}
                          <div className="space-y-2">
                              <Skeleton className='h-4 w-full' />
                              <Skeleton className='h-4 w-full' />
                          </div>

                          {/* footer skeleton */}
                          <div className="mt-auto flex items-center justify-betwee pt-4 ">
                              <div className="flex items-center">
                                  <Skeleton className='h-8 w-8 rounded-full mr-2'/> 
                                  <Skeleton className='h-4 w-24'/>
                              </div>

                              <Skeleton className='h-4 w-16'/>
                          </div>

                      </div>

              </div>
          )) }
      </div>
  )
}