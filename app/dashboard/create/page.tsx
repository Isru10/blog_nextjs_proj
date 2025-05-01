import { handleSubmission } from '@/app/actions'
import SubmitButton from '@/components/general/SubmitButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const CreateBlogroute = () => {
    
  return (
    <div>
        <Card className='max-w-lg mx-auto'> 
            <CardHeader> 
                <CardTitle>    Create post</CardTitle>
                <CardDescription>Create a new post to share </CardDescription>
            </CardHeader>

            <CardContent> 
                <form className='flex flex-col gap-4' action={handleSubmission }> 
                    <div className="flex flex-col gap-2">
                        <Label> Title    </Label>
                        <Input name='title' required type='text' placeholder='title'/>
                    </div>


                    <div className="flex flex-col gap-2">
                        <Label> Content</Label>
                        <Textarea name='content' required placeholder='content'/>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label> Image    </Label>
                        <Input name='url' required type='url' placeholder='image url'/> 
                    </div>

                    <SubmitButton/>
                        
                </form>
            </CardContent>
        </Card>
        
         
    </div>
  )
}

export default CreateBlogroute