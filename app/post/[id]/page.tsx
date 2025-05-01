import { prisma } from '@/app/utils/db'
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

async function getData(id:string) {
    const data = await prisma.blogPost.findUnique({
        where:{
            id:id
        }
    });
    if(!data ){
        return notFound();
    }
    return data
}
type Params = Promise<{id:string}>;
// in next 15 params are ayncchronously fetched 

const IdPage = async ({params} : {params:Params}) => {
    const {id} = await params; //why because params are async/promise we must await and destructure them
    const data = await getData(id);
  return (
    <div className='max-w-3xl mx-auto py-8 px-4 '>
                    <Link className={buttonVariants({variant:"secondary"})} href={"/"} >Back to post</Link>
                    <div className="mb-8 mt-6">
                        <h1 className='text-3xl font-semibold tracking-tight mb-4'> {data.title}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="relative size-10 overflow-hidden rounded-full">
                                                <Image src={data.authorImage} alt={data.authorName} fill className='object-cover'/>
                                </div>
                                <p className='font-medium'>{data.authorName} </p>
                            </div>

                            <p className='text-sm text-gray-500'>
                            {
                                        new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        }).format(new Date(data.createdAt))
                                    }
                            </p>
                        </div>
                    </div>



                    <div className="relative h-[400px] w-full mb-8 overflow-hidden rounded-lg">
                                    <Image src={data.imageUrl} fill alt={data.title} className='object-cover' priority/>
                    </div>

                    <Card> 

                        <CardContent> 
                            <p className='text-gray-500'>{data.content}</p>
                        </CardContent>
                    </Card>

    </div>
  )
}

export default IdPage


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