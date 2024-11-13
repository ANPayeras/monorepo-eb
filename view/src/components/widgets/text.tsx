import { Widget } from '@/types'
import React from 'react'

const Text = ({ widget }: { widget: Widget }) => {
    return (
        <>
            {
                widget?.data?.value ?
                    <div className='w-[90%] p-4 flex items-center justify-center text-center border rounded-sm'>
                        {widget?.data?.value}
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis illum hic dolorum impedit deserunt beatae asperiores enim nihil, distinctio, eaque consequuntur laboriosam corporis mollitia nostrum rerum! Odit, veritatis aperiam aliquam, perferendis cum sunt recusandae id ipsum et ipsam impedit itaque aspernatur facilis error adipisci libero excepturi sit aut, ducimus reiciendis dolorum vitae quo incidunt. Sunt illum voluptatem eligendi tempora? Vel quos fugiat quisquam, ea deserunt nulla explicabo officiis ab. Maiores odio ea voluptate libero corporis error suscipit corrupti eius fugiat?
                    </div> : <></>
            }
        </>
    )
}

export default Text